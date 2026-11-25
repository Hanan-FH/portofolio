export interface RollingTextProps {
  text: string;
  className?: string;
}

export function RollingText({ text, className = '' }: RollingTextProps) {
  return (
    <span className={`roll-mask ${className}`.trim()}>
      <span className="roll-primary">{text}</span>
      <span className="roll-clone" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

export default RollingText;
