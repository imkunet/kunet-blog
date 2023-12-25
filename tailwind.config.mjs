/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: {
              "margin-top": 0,
              "margin-bottom": 0,
              "border-radius": 0,
            },
            code: {
              "&::before": {
                content: '"" !important',
              },
              "&::after": {
                content: '"" !important',
              },
            },
          },
        },
        xl: {
          css: {
            pre: {
              "margin-top": 0,
              "margin-bottom": 0,
              "border-radius": 0,
            },
          },
        },
      },
    },
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "sans-serif"],
      monospace: ["Proto"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@catppuccin/tailwindcss")({
      defaultFlavour: "macchiato",
    }),
  ],
};
