export interface SceneFallbackProps {
  reason?: 'unsupported' | 'error' | 'context-lost' | 'low-power';
  className?: string;
  onRetry?: () => void;
}

/**
 * High-fidelity vector/CSS fallback for the Galaxy 3D centerpiece.
 * Renders an architectural polyhedral diagram with SVG coordinate rings,
 * pulsing focal node, and laboratory telemetry when WebGL is unavailable.
 */
export function SceneFallback({
  reason = 'unsupported',
  className = '',
  onRetry,
}: SceneFallbackProps) {
  const reasonLabels = {
    unsupported: 'HARDWARE WEBGL CONTEXT NOT DETECTED',
    error: 'PIPELINE INITIALIZATION BYPASS',
    'context-lost': 'GPU CONTEXT DISCONNECTED',
    'low-power': 'LOW-POWER STATIC PROFILE ACTIVE',
  };

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xs border border-line bg-panel p-6 select-none ${className}`}
      role="img"
      aria-label="Vector architectural preview of procedural artifact"
    >
      {/* Corner crosshairs */}
      <span className="pointer-events-none absolute left-3 top-3 font-mono text-[0.65rem] text-signal/50" aria-hidden="true">+</span>
      <span className="pointer-events-none absolute right-3 top-3 font-mono text-[0.65rem] text-signal/50" aria-hidden="true">+</span>
      <span className="pointer-events-none absolute bottom-3 left-3 font-mono text-[0.65rem] text-signal/50" aria-hidden="true">+</span>
      <span className="pointer-events-none absolute bottom-3 right-3 font-mono text-[0.65rem] text-signal/50" aria-hidden="true">+</span>

      {/* SVG Procedural Polyhedron & Coordinate Rings */}
      <div className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full text-signal/40"
          aria-hidden="true"
        >
          {/* Outer rotating coordinate ring */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            className="animate-spin [animation-duration:40s]"
          />

          {/* Middle inclined elliptical ring */}
          <ellipse
            cx="100"
            cy="100"
            rx="76"
            ry="38"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.75"
            transform="rotate(-25 100 100)"
          />

          {/* Inner inclined elliptical ring */}
          <ellipse
            cx="100"
            cy="100"
            rx="76"
            ry="38"
            fill="none"
            stroke="#00d1ff"
            strokeWidth="0.75"
            strokeDasharray="2 4"
            transform="rotate(45 100 100)"
          />

          {/* Faceted Core Polyhedron Geometry */}
          <polygon
            points="100,45 145,75 145,125 100,155 55,125 55,75"
            fill="#050811"
            stroke="#00d1ff"
            strokeWidth="1.2"
          />
          <line x1="100" y1="45" x2="100" y2="155" stroke="rgba(0,209,255,0.4)" strokeWidth="0.8" />
          <line x1="55" y1="75" x2="145" y2="125" stroke="rgba(0,209,255,0.4)" strokeWidth="0.8" />
          <line x1="145" y1="75" x2="55" y2="125" stroke="rgba(0,209,255,0.4)" strokeWidth="0.8" />
          <polygon
            points="100,68 128,88 128,118 100,132 72,118 72,88"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.6"
            strokeDasharray="3 3"
          />

          {/* Central Pulsing Node */}
          <circle cx="100" cy="100" r="4.5" fill="#00d1ff" className="animate-pulse" />
        </svg>

        {/* Ambient radial glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-30 blur-2xl"
          style={{ background: 'radial-gradient(circle, #00d1ff 0%, transparent 70%)' }}
        />
      </div>

      {/* Telemetry Status Bar */}
      <div className="mt-4 flex flex-col items-center gap-2 text-center font-mono">
        <span className="rounded-xs border border-line bg-black/80 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-signal">
          VECTOR ENGINE // 2D PRECISION MODE
        </span>
        <span className="text-[0.58rem] tracking-[0.06em] text-dim">
          {reasonLabels[reason]}
        </span>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 rounded-xs border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-[0.62rem] text-signal transition-colors hover:bg-signal/20 hover:border-signal"
          >
            RE-ENGAGE 3D CONTEXT ↻
          </button>
        )}
      </div>
    </div>
  );
}

export default SceneFallback;
