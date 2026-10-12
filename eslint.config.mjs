import nextConfig from 'eslint-config-next/core-web-vitals';
import typescriptConfig from 'eslint-config-next/typescript';

const config = [
  ...nextConfig,
  ...typescriptConfig,
  { ignores: ['.codex/**'] },
  {
    // Report existing effect initialization patterns without blocking CI.
    rules: { 'react-hooks/set-state-in-effect': 'warn' },
  },
  {
    files: ['components/backgrounds/LiquidEtherBackground.tsx'],
    // Gradually improve the shader's existing types without hiding them.
    rules: { '@typescript-eslint/no-explicit-any': 'warn' },
  },
];

export default config;
