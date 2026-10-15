// Audio synthesis and speech recognition utilities with instant caching & high-fidelity voice engine

class AudioEngine {
  private currentAudio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private audioCache = new Map<string, string>(); // text:voiceName -> base64
  private naturalVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.initVoices();
  }

  private initVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        this.naturalVoices = window.speechSynthesis.getVoices().filter((v) =>
          v.lang.startsWith('en')
        );
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Play synthesized chime or bell for pedagogical achievements
  playDing(type: 'success' | 'click' | 'step' = 'click') {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.3); // C6
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
      } else if (type === 'step') {
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.exponentialRampToValueAtTime(554.37, now + 0.15); // C#5
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else {
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch {
      // AudioContext might be blocked until user gesture, safely ignore
    }
  }

  // Stop currently playing audio
  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Play text with Gemini TTS (with 0ms client memory cache) or ultra-natural browser fallback
  async speakText(
    text: string,
    options: {
      voiceName?: string;
      rate?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    } = {}
  ): Promise<void> {
    this.stopAudio();
    options.onStart?.();

    const voice = options.voiceName || 'Aoede';
    const rate = options.rate || 1.0;
    const cacheKey = `${voice}:::${text.trim().toLowerCase()}`;

    // 1. Instant sub-10ms playback if audio was previously loaded
    if (this.audioCache.has(cacheKey)) {
      const cachedBase64 = this.audioCache.get(cacheKey)!;
      this.playBase64Audio(cachedBase64, rate, options.onEnd, () => {
        this.fallbackSpeechSynthesis(text, rate, options.onEnd);
      });
      return;
    }

    // 2. Fetch from Gemini TTS server with pre-caching & resilient timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout to avoid premature fallback

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceName: voice }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.audioBase64) {
          this.audioCache.set(cacheKey, data.audioBase64);
          this.playBase64Audio(data.audioBase64, rate, options.onEnd, () => {
            this.fallbackSpeechSynthesis(text, rate, options.onEnd);
          });
          return;
        }
      }

      // Fallback if server returned no audio or quota limit reached
      this.fallbackSpeechSynthesis(text, rate, options.onEnd);
    } catch {
      // Fast fallback to browser SpeechSynthesis on network timeout or offline
      this.fallbackSpeechSynthesis(text, rate, options.onEnd);
    }
  }

  // Safe background audio prefetcher (no-op to prevent hitting 3 RPM Gemini TTS free-tier quota)
  async preloadAudio(_texts: string[], _voiceName = 'Aoede'): Promise<void> {
    // Requests are generated on-demand when the user clicks 'Play'
  }

  private playBase64Audio(
    base64Data: string,
    rate: number,
    onEnd?: () => void,
    onError?: () => void
  ) {
    try {
      const audio = new Audio(`data:audio/wav;base64,${base64Data}`);
      audio.playbackRate = rate;
      this.currentAudio = audio;

      audio.onended = () => {
        this.currentAudio = null;
        onEnd?.();
      };
      audio.onerror = () => {
        this.currentAudio = null;
        onError?.();
      };

      audio.play().catch(() => {
        onError?.();
      });
    } catch {
      onError?.();
    }
  }

  // Enhanced Natural Speech Synthesis fallback
  public fallbackSpeechSynthesis(text: string, rate: number, onEnd?: () => void) {
    if (!('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate * 0.95; // Slightly relaxed for maximum clarity & natural cadence
    utterance.pitch = 1.0;

    const voices = this.naturalVoices.length > 0
      ? this.naturalVoices
      : window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'));

    // Ranked list of preferred high-fidelity natural neural voices
    const preferredNames = [
      'Natural',
      'Google US English',
      'Samantha',
      'Aria',
      'Jenny',
      'Guy',
      'Neural',
      'Premium',
      'Enhanced',
      'Karen',
      'Daniel',
    ];

    let chosenVoice = null;
    for (const name of preferredNames) {
      chosenVoice = voices.find((v) => v.name.includes(name));
      if (chosenVoice) break;
    }

    if (!chosenVoice) {
      chosenVoice = voices.find((v) => v.lang === 'en-US') || voices[0];
    }

    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.onend = () => {
      onEnd?.();
    };
    utterance.onerror = () => {
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  }
}

export const audioEngine = new AudioEngine();

// Robust Speech Recognition wrapper (Web Speech API)
// Fixes "lúc được lúc không" and handles full sentence reading smoothly
export class SpeechRecognizer {
  private recognition: any = null;
  public isListening = false;
  private currentFinal = '';
  private latestTranscript = '';
  private silenceTimer: any = null;
  private hasSubmitted = false;

  constructor(
    private onResult: (transcript: string, isFinal: boolean) => void,
    private onError: (err: any) => void,
    private onStateChange: (listening: boolean) => void,
    continuous = true
  ) {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      // ALWAYS use continuous = true so pauses between words in a sentence do NOT cut off recognition
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.currentFinal = '';
        this.latestTranscript = '';
        this.hasSubmitted = false;
        this.onStateChange(true);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.onStateChange(false);
        this.clearSilenceTimer();

        // Deliver final result if not already submitted
        if (!this.hasSubmitted) {
          const finalCandidate = (this.currentFinal.trim() || this.latestTranscript.trim());
          if (finalCandidate) {
            this.hasSubmitted = true;
            this.onResult(finalCandidate, true);
          }
        }
      };

      this.recognition.onerror = (event: any) => {
        this.clearSilenceTimer();
        // Ignore "no-speech" if we already captured interim text
        if (event.error === 'no-speech' && this.latestTranscript.trim()) {
          if (!this.hasSubmitted) {
            this.hasSubmitted = true;
            this.onResult(this.latestTranscript.trim(), true);
          }
          return;
        }

        this.isListening = false;
        this.onStateChange(false);
        this.onError(event.error);
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.currentFinal += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const combined = (this.currentFinal + interimTranscript).trim();
        if (combined) {
          this.latestTranscript = combined;
          this.onResult(combined, false);

          // Reset silence timer: automatically finalize after 2.2 seconds of silence
          this.resetSilenceTimer();
        }
      };
    }
  }

  private resetSilenceTimer() {
    this.clearSilenceTimer();
    this.silenceTimer = setTimeout(() => {
      // Auto-submit after natural sentence completion pause
      if (this.isListening && this.latestTranscript.trim() && !this.hasSubmitted) {
        this.forceSubmit();
      }
    }, 2200);
  }

  private clearSilenceTimer() {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
  }

  isSupported(): boolean {
    return !!this.recognition;
  }

  getLastTranscript(): string {
    return (this.currentFinal.trim() || this.latestTranscript.trim());
  }

  start() {
    if (!this.recognition) return;
    try {
      this.currentFinal = '';
      this.latestTranscript = '';
      this.hasSubmitted = false;
      this.recognition.start();
    } catch {
      // already started or transitioning
    }
  }

  // Immediately finalize and submit whatever was spoken so far
  forceSubmit() {
    this.clearSilenceTimer();
    const captured = this.getLastTranscript();
    if (!this.hasSubmitted) {
      this.hasSubmitted = true;
      this.onResult(captured || '', true);
    }
    this.stop();
  }

  stop() {
    this.clearSilenceTimer();
    if (!this.recognition) return;
    try {
      this.recognition.stop();
    } catch {
      // ignore
    }
  }
}
