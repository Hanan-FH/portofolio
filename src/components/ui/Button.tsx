import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
  variant?: 'solid' | 'quiet' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const VARIANT_CLASSES = {
  solid:
    'border-paper/85 bg-panel-raised text-paper hover:border-signal hover:bg-signal hover:text-ink hover:shadow-[0_0_24px_rgba(0,209,255,0.35)]',
  quiet:
    'border-line bg-panel/60 text-mist hover:border-signal/50 hover:bg-panel-raised hover:text-paper',
  outline:
    'border-line-strong bg-transparent text-paper hover:border-signal hover:text-signal',
  ghost:
    'border-transparent bg-transparent text-mist hover:text-paper',
};

const SIZE_CLASSES = {
  sm: 'min-h-9 px-3.5 py-1.5 text-xs',
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-12 px-7 py-3 text-base',
};

export function Button({
  variant = 'solid',
  size = 'md',
  children,
  className = '',
  href,
  ...rest
}: ButtonProps) {
  const commonClasses = `inline-flex items-center justify-center gap-2 rounded-xs border font-medium transition-all duration-200 ease-fluid focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-black ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`.trim();

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={commonClasses}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={commonClasses}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export default Button;
