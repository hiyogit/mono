import type { ButtonHTMLAttributes } from 'react';
import { tokens } from './tokens';

export function Button({ style, disabled, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={disabled}
      style={{
        background: tokens.color.primary,
        color: tokens.color.primaryText,
        border: 'none',
        borderRadius: tokens.radius,
        padding: `${tokens.space(2)}px ${tokens.space(4)}px`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
      {...props}
    />
  );
}
