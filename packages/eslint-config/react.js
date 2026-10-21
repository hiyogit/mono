// React 앱/패키지용: base + 브라우저 globals + hooks 규칙
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import base from './base.js';

export default tseslint.config(...base, reactHooks.configs.flat.recommended, {
  languageOptions: { globals: { ...globals.browser } },
});
