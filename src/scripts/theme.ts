import Moon from '@/assets/icons/moon.svg?raw';
import SunMoon from '@/assets/icons/sun-moon.svg?raw';
import Sun from '@/assets/icons/sun.svg?raw';

const html = document.documentElement;
const lightTheme = 'latte';
const darkTheme = 'macchiato';

const lightThemeColor = '#EFF1F5';
const darkThemeColor = '#252739';

// modified to have a media query for no js
const giscusAdaptive = 'https://blog.kunet.dev/protanopia.css';
const giscusDark = 'dark_protanopia';
const giscusLight = 'light_protanopia';

let initialTheme = 'system';
let themeButton: HTMLButtonElement | null = null;
let themeColorMeta: HTMLMetaElement | null = null;

const loadPageElements = () => {
  initialTheme = localStorage.getItem('theme') || 'system';
  themeButton = document.querySelector('button#theme-switcher');
  themeColorMeta = document.querySelector('meta[name="theme-color"]');

  themeButton?.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'system';
    const newTheme =
      currentTheme === 'system' ? 'light' : currentTheme === 'light' ? 'dark' : 'system';
    console.log('Current theme is', currentTheme);
    console.log('Switching theme to', newTheme);
    localStorage.setItem('theme', newTheme);
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
    document.querySelector('script#giscus-script')?.setAttribute('data-theme', theme);

    const frame: HTMLIFrameElement | null = document.querySelector('iframe.giscus-frame');
    if (frame === null) return;

    const url = new URL(frame.src);
    url.searchParams.set('theme', theme);
    frame.src = url.toString();
    frame.contentWindow?.location.reload();
  } catch (e) {
    console.error('Error switching giscus theme', e);
  }
};

const loadTheme = (theme: string | null) => {
  if (themeButton) {
    themeButton.innerHTML = SunMoon;
    themeButton.ariaLabel = 'Theme Switcher (System)';
    themeButton.title = 'System';
    if (theme === 'light') {
      themeButton.innerHTML = Sun;
      themeButton.ariaLabel = 'Theme Switcher (Light)';
      themeButton.title = 'Light';
    }
    if (theme === 'dark') {
      themeButton.innerHTML = Moon;
      themeButton.ariaLabel = 'Theme Switcher (Dark)';
      themeButton.title = 'Dark';
    }
  }

  if (theme === 'light') {
    html.classList.remove(darkTheme);
    html.classList.add(lightTheme);
    html.setAttribute('data-theme', 'light');
    giscusTheme(giscusLight);
    themeColorMeta?.setAttribute('content', lightThemeColor);
    return;
  }

  if (theme === 'dark') {
    html.classList.remove(lightTheme);
    html.classList.add(darkTheme);
    html.setAttribute('data-theme', 'dark');
    giscusTheme(giscusDark);
    themeColorMeta?.setAttribute('content', darkThemeColor);
    return;
  }

  html.classList.remove(darkTheme);
  html.setAttribute('data-theme', 'system');
  giscusTheme(giscusAdaptive);
  themeColorMeta?.setAttribute(
    'content',
    window.matchMedia('(prefers-color-scheme: dark)').matches ? darkThemeColor : lightThemeColor,
  );
};

loadPageElements();
loadTheme(initialTheme);
document.addEventListener('astro:page-load', () => {
  loadPageElements();
  loadTheme(initialTheme);
});

// listen for other tabs updating the theme
window.addEventListener('storage', (e) => e.key === 'theme' && loadTheme(e.newValue));

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
  const currentTheme = localStorage.getItem('theme') || 'system';
  if (currentTheme !== 'system') return;

  themeColorMeta?.setAttribute('content', matches ? darkThemeColor : lightThemeColor);
});
