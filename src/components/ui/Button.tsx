import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonStyleProps {
  variant?: 'primary' | 'outline' | 'glass';
  size?: 'md' | 'sm';
}

function buttonClass({ variant = 'primary', size = 'md' }: ButtonStyleProps, className = '') {
  return `btn btn--${variant} btn--${size} ${className}`;
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...rest
}: ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClass({ variant, size }, className)} {...rest} />;
}

/** Same look as Button, rendered as a link. */
export function ButtonLink({
  variant,
  size,
  className,
  ...rest
}: ButtonStyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClass({ variant, size }, className)} {...rest} />;
}
