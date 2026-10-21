import type { ReactNode } from 'react';
import { APP_NAME } from '@mono/consts';

export const metadata = { title: `${APP_NAME} · Web` };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ fontFamily: 'sans-serif', maxWidth: 640, margin: '40px auto', padding: 16 }}>
        {children}
      </body>
    </html>
  );
}
