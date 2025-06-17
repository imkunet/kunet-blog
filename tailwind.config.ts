import { type Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: {
              'margin-top': 0,
              'margin-bottom': 0,
              'border-radius': 0,
            },
            code: {
              '&::before': {
                content: '"" !important',
              },
              '&::after': {
                content: '"" !important',
              },
              background: 'rgba(0, 0, 0, 0.1)',
              color: 'var(--color-hotpink) !important',
              padding: '0.125rem 0.25rem',
              'border-radius': '0.25rem',
              'font-family': 'MonaspaceRadon, Lilex, monospace',
              'font-weight': 600,
              'text-decoration-color': 'currentColor',
            },
            blockquote: {
              'font-style': 'normal',
              'p::before': {
                content: '"" !important',
              },
              'p::after': {
                content: '"" !important',
              },
            },
            a: {
              color: 'var(--color-hotpink)',
              'text-decoration-color': 'var(--color-hotpink-light)',
              'text-decoration-style': 'dotted',
            },
            img: {
              'border-radius': '0.5rem',
              'margin-left': 'auto',
              'margin-right': 'auto',
            },
          },
        },
        xl: {
          css: {
            pre: {
              'margin-top': 0,
              'margin-bottom': 0,
              'border-radius': 0,
            },
          },
        },
        linked: {
          css: {
            a: {
              'text-decoration': 'none !important',
              color: 'unset !important',
            },
          },
        },
        article: {
          css: {
            h2: {
              'font-family': 'var(--font-serif)',
            },
            h3: {
              'font-family': 'var(--font-serif)',
            },
            h4: {
              'font-family': 'var(--font-serif)',
            },
            h5: {
              'font-family': 'var(--font-serif)',
            },
            h6: {
              'font-family': 'var(--font-serif)',
            },
          },
        },
      },
    },
  },
};

export default config;
