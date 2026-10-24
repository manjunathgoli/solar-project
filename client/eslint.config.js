import js from '@eslint/js';

export default [
  { ignores: ['dist/**'] },
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        document: 'readonly',
        fetch: 'readonly',
        Intl: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        TextDecoder: 'readonly',
        window: 'readonly',
      },
    },
    rules: { 'no-unused-vars': 'off' },
  },
];
