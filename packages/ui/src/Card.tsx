import type { ReactNode } from 'react';
import { tokens } from './tokens';

export function Card({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <section
      style={{
        background: tokens.color.surface,
        border: `1px solid ${tokens.color.border}`,
        borderRadius: tokens.radius,
        padding: tokens.space(4),
        color: tokens.color.text,
      }}
    >
      {title && <h3 style={{ margin: `0 0 ${tokens.space(2)}px` }}>{title}</h3>}
      {children}
    </section>
  );
}
