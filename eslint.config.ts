import pluginJs from '@eslint/js';
import astro from 'eslint-plugin-astro';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import * as mdx from 'eslint-plugin-mdx';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,astro,mdx}'] },
  { ignores: ['**/env.d.ts', '**/.astro/', 'dist/**/*', 'public/**/*'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  ...astro.configs.recommended,
  {
    ...mdx.flat,
    processor: mdx.createRemarkProcessor(),
  },
  {
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
      ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
      'better-tailwindcss/multiline': ['warn', { printWidth: 100 }],
      'better-tailwindcss/no-unregistered-classes': [
        'off',
        // 'warn',
        // { entryPoint: 'src/styles/global.css' },
      ],
    },
  },
  {
    rules: {
      'prettier/prettier': ['warn'],
    },
  },
  {
    files: ['**/*.mdx'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['off'],
    },
  },
];
