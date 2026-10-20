export interface LoadingIndicatorProps {
  label?: string;
  sublabel?: string;
  className?: string;
}

export function LoadingIndicator({
  label = 'INITIALIZING 3D SUBSYSTEM',
  sublabel = 'CALIBRATING WEBGL PIPELINE',
  className = '',
}: LoadingIndicatorProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 text-center font-mono select-none ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex h-12 w-12 items-center justify-center">
        {/* Outer rotating coordinate ring */}
        <div className="absolute h-full w-full rounded-full border border-signal/30 border-t-signal animate-spin [animation-duration:1.5s]" />
        {/* Inner pulsating core node */}
        <div className="h-3 w-3 rounded-full bg-signal shadow-[0_0_12px_#00d1ff] animate-ping" />
      </div>

      <div className="mt-4 flex items-center gap-2 text-[0.68rem] tracking-[0.14em] text-signal">
        <span className="h-1.5 w-1.5 rounded-full bg-signal" />
        <span>{label}</span>
      </div>

      {sublabel && (
        <span className="mt-1 text-[0.6rem] tracking-[0.08em] text-dim">
          {sublabel}
        </span>
      )}
    </div>
  );
}

export default LoadingIndicator;
