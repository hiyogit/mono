import { defineConfig } from 'tsup';

const common = { format: ['esm', 'cjs'] as const, dts: true, external: ['react'] };

export default defineConfig([
  {
    ...common,
    entry: { index: 'src/index.ts' },
    // 번들링 과정에서 지시어가 사라지므로, Next 서버 컴포넌트에서 쓸 수 있도록 다시 붙인다
    banner: { js: "'use client';" },
  },
  {
    // 토큰은 서버 컴포넌트에서도 값으로 읽어야 하므로 'use client' 없는 별도 진입점으로 낸다
    ...common,
    entry: { tokens: 'src/tokens.ts' },
  },
]);
