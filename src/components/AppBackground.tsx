import React from 'react';
import { BackgroundSettings } from '../types';

interface AppBackgroundProps {
  settings: BackgroundSettings;
}

export const AppBackground: React.FC<AppBackgroundProps> = ({ settings }) => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Underlying Base Canvas */}
      <div className="absolute inset-0 bg-[#0B0F19]" />

      {/* 2. Photo / Lantern Scene Layer with Adjustable Blur & Brightness */}
      <div
        className="absolute inset-0 w-full h-full transition-all duration-300 ease-out"
        style={{
          opacity: settings.opacity,
          filter: `blur(${settings.blurPx}px) brightness(${settings.brightness})`,
          transform: 'scale(1.05)', // Prevent edge blur artifacts
        }}
      >
        {settings.customImage ? (
          <img
            src={settings.customImage}
            alt="Family Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          /* High-Fidelity Artistic Rendering of the Uploaded Family Lantern Photo */
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1600 1000"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Sky / Night Alley Gradient */}
              <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#050814" />
                <stop offset="40%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#1E1611" />
              </linearGradient>

              {/* Lantern Glow Filter */}
              <radialGradient id="lanternGlowRed" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF4D4D" stopOpacity="1" />
                <stop offset="45%" stopColor="#E60000" stopOpacity="0.9" />
                <stop offset="80%" stopColor="#990000" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#990000" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="ambientLight" cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#FF7733" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#CC3300" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
              </radialGradient>

              {/* Brick walkway gradient */}
              <linearGradient id="terracottaFloor" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2A1B12" />
                <stop offset="50%" stopColor="#3D2418" />
                <stop offset="100%" stopColor="#1E120D" />
              </linearGradient>
            </defs>

            {/* Background base */}
            <rect width="1600" height="1000" fill="url(#nightSky)" />

            {/* Traditional Pagoda Roof Eaves on Left and Right with String Lights */}
            <path
              d="M 0 0 L 500 0 L 450 160 L 320 220 L 250 180 L 120 400 L 0 450 Z"
              fill="#111827"
              opacity="0.85"
            />
            <path
              d="M 1600 0 L 1100 0 L 1150 180 L 1280 240 L 1380 200 L 1520 420 L 1600 460 Z"
              fill="#111827"
              opacity="0.85"
            />

            {/* Pagoda Roof String Lights (Warm White dots along eaves) */}
            {[
              [480, 20], [450, 60], [430, 100], [410, 140], [370, 180], [330, 210],
              [290, 195], [250, 185], [200, 260], [160, 320], [130, 370], [90, 410],
              [1120, 20], [1150, 60], [1180, 110], [1210, 150], [1250, 200], [1290, 230],
              [1330, 210], [1370, 195], [1420, 280], [1460, 340], [1500, 390]
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3.5" fill="#FFFBEB" opacity="0.9" />
            ))}

            {/* Brick Walkway Perspective */}
            <path
              d="M 280 1000 L 620 450 L 980 450 L 1320 1000 Z"
              fill="url(#terracottaFloor)"
            />

            {/* Walkway perspective grid lines */}
            <line x1="620" y1="450" x2="280" y2="1000" stroke="#5C3826" strokeWidth="2" opacity="0.4" />
            <line x1="710" y1="450" x2="540" y2="1000" stroke="#5C3826" strokeWidth="2" opacity="0.3" />
            <line x1="800" y1="450" x2="800" y2="1000" stroke="#5C3826" strokeWidth="2" opacity="0.3" />
            <line x1="890" y1="450" x2="1060" y2="1000" stroke="#5C3826" strokeWidth="2" opacity="0.3" />
            <line x1="980" y1="450" x2="1320" y2="1000" stroke="#5C3826" strokeWidth="2" opacity="0.4" />

            {/* Ambient Warm Glow from Central Lanterns */}
            <ellipse cx="800" cy="300" rx="600" ry="350" fill="url(#ambientLight)" />

            {/* Hanging Lanterns: Left Group (from foreground to background) */}
            {/* Lantern 1 - Foreground Left */}
            <g transform="translate(180, 70)">
              <line x1="60" y1="0" x2="60" y2="35" stroke="#D97706" strokeWidth="2" />
              <circle cx="60" cy="100" r="75" fill="url(#lanternGlowRed)" />
              <ellipse cx="60" cy="100" rx="60" ry="70" fill="#DC2626" />
              <ellipse cx="60" cy="100" rx="35" ry="70" fill="#EF4444" opacity="0.7" />
              <line x1="60" y1="30" x2="60" y2="170" stroke="#FEF08A" strokeWidth="2" opacity="0.8" />
              {/* Golden Tassels */}
              <rect x="52" y="170" width="16" height="8" rx="2" fill="#F59E0B" />
              <path d="M 54 178 L 50 250 M 58 178 L 57 255 M 62 178 L 63 255 M 66 178 L 70 250" stroke="#FBBF24" strokeWidth="2" />
            </g>

            {/* Lantern 2 - Midground Left */}
            <g transform="translate(360, 140)">
              <line x1="45" y1="0" x2="45" y2="30" stroke="#D97706" strokeWidth="1.5" />
              <circle cx="45" cy="80" r="55" fill="url(#lanternGlowRed)" />
              <ellipse cx="45" cy="80" rx="45" ry="52" fill="#DC2626" />
              <ellipse cx="45" cy="80" rx="26" ry="52" fill="#EF4444" opacity="0.7" />
              <rect x="39" y="132" width="12" height="6" rx="2" fill="#F59E0B" />
              <path d="M 41 138 L 38 195 M 44 138 L 45 200 M 49 138 L 52 195" stroke="#FBBF24" strokeWidth="1.5" />
            </g>

            {/* Lantern 3 - Right Foreground */}
            <g transform="translate(1180, 50)">
              <line x1="60" y1="0" x2="60" y2="40" stroke="#D97706" strokeWidth="2" />
              <circle cx="60" cy="115" r="85" fill="url(#lanternGlowRed)" />
              <ellipse cx="60" cy="115" rx="70" ry="80" fill="#DC2626" />
              <ellipse cx="60" cy="115" rx="40" ry="80" fill="#EF4444" opacity="0.7" />
              <line x1="60" y1="35" x2="60" y2="195" stroke="#FEF08A" strokeWidth="2" opacity="0.8" />
              <rect x="52" y="195" width="16" height="8" rx="2" fill="#F59E0B" />
              <path d="M 54 203 L 50 275 M 58 203 L 57 280 M 62 203 L 63 280 M 66 203 L 70 275" stroke="#FBBF24" strokeWidth="2" />
            </g>

            {/* Lantern 4 - Right Midground */}
            <g transform="translate(1040, 160)">
              <line x1="40" y1="0" x2="40" y2="30" stroke="#D97706" strokeWidth="1.5" />
              <circle cx="40" cy="75" r="50" fill="url(#lanternGlowRed)" />
              <ellipse cx="40" cy="75" rx="40" ry="46" fill="#DC2626" />
              <ellipse cx="40" cy="75" rx="24" ry="46" fill="#EF4444" opacity="0.7" />
              <rect x="35" y="121" width="10" height="5" rx="2" fill="#F59E0B" />
              <path d="M 37 126 L 34 180 M 40 126 L 40 185 M 43 126 L 46 180" stroke="#FBBF24" strokeWidth="1.5" />
            </g>

            {/* Central Family Warm Silhouette / Ambient Presence */}
            <g transform="translate(720, 520)" opacity="0.75">
              {/* Warm glow around family */}
              <ellipse cx="80" cy="220" rx="140" ry="180" fill="#F59E0B" opacity="0.12" />

              {/* Father (Left, holding child) */}
              <circle cx="120" cy="70" r="22" fill="#CBD5E1" opacity="0.8" />
              <path d="M 95 95 C 95 95 120 90 145 95 L 140 260 L 100 260 Z" fill="#334155" />

              {/* Mother (Left Center, with father) */}
              <circle cx="50" cy="85" r="20" fill="#E2E8F0" opacity="0.85" />
              <path d="M 30 110 C 30 110 50 105 75 110 L 80 280 L 25 280 Z" fill="#64748B" />

              {/* Little Daughter (Held in center, warm yellow glow) */}
              <circle cx="85" cy="115" r="16" fill="#FDE68A" />
              <path d="M 72 135 C 72 135 85 130 98 135 L 94 200 L 76 200 Z" fill="#F59E0B" />

              {/* Soft ground shadow */}
              <ellipse cx="80" cy="300" rx="120" ry="25" fill="#050814" opacity="0.85" />
            </g>

            {/* Bokeh floating particles */}
            {[
              [350, 480, 8, 0.4], [480, 320, 12, 0.3], [600, 240, 16, 0.25],
              [950, 220, 14, 0.3], [1120, 360, 10, 0.35], [1240, 480, 8, 0.4],
              [780, 160, 18, 0.2]
            ].map(([bx, by, br, bop], idx) => (
              <circle key={idx} cx={bx} cy={by} r={br} fill="#FBBF24" opacity={bop} />
            ))}
          </svg>
        )}
      </div>

      {/* 3. Dark Gradient Protective Overlay (Ensures AA/AAA Text Legibility) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/90 via-[#0B0F19]/80 to-[#0B0F19]/95 pointer-events-none"
        style={{
          opacity: 1 - settings.opacity * 0.4, // Automatically increases darkening if photo is bright
        }}
      />

      {/* 4. Radial Vignette for focused reading area */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#0B0F19_80%)] pointer-events-none" />
    </div>
  );
};
