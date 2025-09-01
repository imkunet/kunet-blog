import Moon from '@/assets/icons/moon.svg?raw';
import SunMoon from '@/assets/icons/sun-moon.svg?raw';
import Sun from '@/assets/icons/sun.svg?raw';

const html = document.documentElement;
const lightTheme = `latte`;
const darkTheme = `macchiato`;

const lightThemeColor = `#EFF1F5`;
const darkThemeColor = `#252739`;

// modified to have a media query for no js
const giscusAdaptive = `https://blog.kunet.dev/protanopia.css`;
const giscusDark = `dark_protanopia`;
const giscusLight = `light_protanopia`;

let initialTheme = `system`;
let themeButton: HTMLButtonElement | undefined;
let themeColorMeta: HTMLMetaElement | undefined;

const fetchCurrentTheme = () =>
  globalThis.matchMedia(`(prefers-color-scheme: dark)`).matches;

const loadPageElements = () => {
  initialTheme = localStorage.getItem(`theme`) ?? `system`;
  themeButton =
    (document.querySelector(`button#theme-switcher`) as HTMLButtonElement) ??
    undefined;
  themeColorMeta =
    (document.querySelector(`meta[name="theme-color"]`) as HTMLMetaElement) ??
    undefined;

  themeButton?.addEventListener(`click`, () => {
    const currentTheme = localStorage.getItem(`theme`) ?? `system`;
    const newTheme =
      currentTheme === `system`
        ? `light`
        : currentTheme === `light`
          ? `dark`
          : `system`;
    console.log(`Current theme is`, currentTheme);
    console.log(`Switching theme to`, newTheme);
    localStorage.setItem(`theme`, newTheme);
    if (!document.startViewTransition) {
      loadTheme(newTheme);
      return;
    }
    document.startViewTransition(() => loadTheme(newTheme));
  });
};

// thank you to https://github.com/giscus/giscus/issues/1200#issuecomment-1954929802
// for figuring out the giscus theme switching
const giscusTheme = (theme: string) => {
  try {
    document
      .querySelector(`script#giscus-script`)
      ?.setAttribute(`data-theme`, theme);

    const frame: HTMLIFrameElement | undefined =
      (document.querySelector(`iframe.giscus-frame`) as HTMLIFrameElement) ??
      undefined;
    if (frame === undefined) return;

    const url = new URL(frame.src);
    url.searchParams.set(`theme`, theme);
    frame.src = url.toString();
    frame.contentWindow?.location.reload();
  } catch (error) {
    console.error(`Error switching giscus theme`, error);
  }
};

const loadTheme = (theme: string | undefined) => {
  if (themeButton) {
    themeButton.innerHTML = SunMoon;
    themeButton.ariaLabel = `Theme Switcher (System)`;
    themeButton.title = `System`;
    if (theme === `light`) {
      themeButton.innerHTML = Sun;
      themeButton.ariaLabel = `Theme Switcher (Light)`;
      themeButton.title = `Light`;
    }
    if (theme === `dark`) {
      themeButton.innerHTML = Moon;
      themeButton.ariaLabel = `Theme Switcher (Dark)`;
      themeButton.title = `Dark`;
    }
  }

  html.classList.remove(lightTheme, darkTheme);

  if (theme === `light`) {
    html.classList.add(lightTheme);
    html.dataset.theme = `light`;
    giscusTheme(giscusLight);
    themeColorMeta?.setAttribute(`content`, lightThemeColor);
    return;
  }

  if (theme === `dark`) {
    html.classList.add(darkTheme);
    html.dataset.theme = `dark`;
    giscusTheme(giscusDark);
    themeColorMeta?.setAttribute(`content`, darkThemeColor);
    return;
  }

  const currentTheme = fetchCurrentTheme();
  html.classList.add(currentTheme ? darkTheme : lightTheme);
  html.dataset.theme = currentTheme ? `dark` : `light`;
  giscusTheme(giscusAdaptive);
  themeColorMeta?.setAttribute(
    `content`,
    currentTheme ? darkThemeColor : lightThemeColor,
  );
};

loadPageElements();
loadTheme(initialTheme);
document.addEventListener(`astro:page-load`, () => {
  loadPageElements();
  loadTheme(initialTheme);
});

// listen for other tabs updating the theme
globalThis.addEventListener(
  `storage`,
  (e: StorageEvent) => e.key === `theme` && loadTheme(e.newValue ?? undefined),
);

globalThis
  .matchMedia(`(prefers-color-scheme: dark)`)
  .addEventListener(`change`, ({ matches }) => {
    loadTheme(`system`);
    themeColorMeta?.setAttribute(
      `content`,
      matches ? darkThemeColor : lightThemeColor,
    );
  });
