// @ts-check

import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig({
  files: ['**/*.ts'],
  ignores: ["dist/**"],
  languageOptions: {
    parser: tseslint.parser,
  },
  extends: [
    eslint.configs.recommended,
    eslintPluginPrettierRecommended,
    ...tseslint.configs.recommended,
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    'prettier/prettier': ['warn', {
      "printWidth": 150,
      "semi": true,
      "singleQuote": true,
      "tabWidth": 2,
      "trailingComma": "es5"
    }],
  }
});