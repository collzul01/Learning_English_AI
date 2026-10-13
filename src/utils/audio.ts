// Audio synthesis and speech recognition utilities

class AudioEngine {
  private currentAudio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;

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

  // Play text with Gemini TTS or browser speech fallback
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

    const voice = options.voiceName || 'Kore';
    const rate = options.rate || 1.0;

    try {
      // Try calling server-side Gemini TTS
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceName: voice }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audioBase64) {
          const audio = new Audio(`data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`);
          audio.playbackRate = rate;
          this.currentAudio = audio;

          audio.onended = () => {
            this.currentAudio = null;
            options.onEnd?.();
          };
          audio.onerror = () => {
            this.fallbackSpeechSynthesis(text, rate, options.onEnd);
          };

          await audio.play();
          return;
        }
      }
      // If server TTS failed or returned no audio, fallback to Web Speech
      this.fallbackSpeechSynthesis(text, rate, options.onEnd);
    } catch {
      this.fallbackSpeechSynthesis(text, rate, options.onEnd);
    }
  }

  private fallbackSpeechSynthesis(text: string, rate: number, onEnd?: () => void) {
    if (!('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;

    // Pick natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
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

// Speech Recognition wrapper (Web Speech API)
export class SpeechRecognizer {
  private recognition: any = null;
  public isListening = false;
  private currentFinal = '';

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
      this.recognition.continuous = continuous;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.currentFinal = '';
        this.onStateChange(true);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.onStateChange(false);
        if (this.currentFinal.trim()) {
          this.onResult(this.currentFinal.trim(), true);
        }
      };

      this.recognition.onerror = (event: any) => {
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
          this.onResult(combined, false);
        }
      };
    }
  }

  isSupported(): boolean {
    return !!this.recognition;
  }

  start() {
    if (!this.recognition) return;
    try {
      this.currentFinal = '';
      this.recognition.start();
    } catch {
      // might already be started
    }
  }

  stop() {
    if (!this.recognition) return;
    try {
      this.recognition.stop();
    } catch {
      // ignore
    }
  }
}
