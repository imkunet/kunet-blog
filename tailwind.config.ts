import { type Config } from 'tailwindcss';

const config: Config = {
  content: [`./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`],
  theme: {
    extend: {
      typography: {
        article: {
          css: {
            h2: {
              'font-family': `var(--font-serif)`,
            },
            h3: {
              'font-family': `var(--font-serif)`,
            },
            h4: {
              'font-family': `var(--font-serif)`,
            },
            h5: {
              'font-family': `var(--font-serif)`,
            },
            h6: {
              'font-family': `var(--font-serif)`,
            },
          },
        },
        DEFAULT: {
          css: {
            a: {
              color: `var(--color-hotpink)`,
              'text-decoration-color': `var(--color-hotpink-light)`,
              'text-decoration-style': `dotted`,
            },
            blockquote: {
              'font-style': `normal`,
              'p::after': {
                content: `"" !important`,
              },
              'p::before': {
                content: `"" !important`,
              },
            },
            code: {
              '&::after': {
                content: `"" !important`,
              },
              '&::before': {
                content: `"" !important`,
              },
              background: `rgba(0, 0, 0, 0.1)`,
              'border-radius': `0.25rem`,
              color: `var(--color-hotpink) !important`,
              'font-family': `MonaspaceRadon, Lilex, monospace`,
              'font-weight': 600,
              padding: `0.125rem 0.25rem`,
              'text-decoration-color': `currentColor`,
            },
            img: {
              'border-radius': `0.5rem`,
              'margin-left': `auto`,
              'margin-right': `auto`,
            },
            pre: {
              'border-radius': 0,
              'margin-bottom': 0,
              'margin-top': 0,
            },
          },
        },
        linked: {
          css: {
            a: {
              color: `unset !important`,
              'text-decoration': `none !important`,
            },
          },
        },
        xl: {
          css: {
            pre: {
              'border-radius': 0,
              'margin-bottom': 0,
              'margin-top': 0,
            },
          },
        },
      },
    },
  },
};

export default config;
