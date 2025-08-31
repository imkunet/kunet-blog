import '@/styles/zoom.css';
import mediumZoom from 'medium-zoom/dist/pure';

export const zoom = mediumZoom({
  background: `rgba(0, 0, 0, 0.4)`,
  margin: 12,
  scrollOffset: 50,
});

const setFacadeBorderRadius = (borderRadius: string) => {
  const activeImage = document.querySelector(
    `img.medium-zoom-image.medium-zoom-image--opened`,
  ) as HTMLElement;
  if (activeImage) activeImage.style.borderRadius = borderRadius;
};

zoom.on(`open`, () => {
  globalThis.requestAnimationFrame(() => {
    setFacadeBorderRadius(`0`);
  });
});

zoom.on(`close`, () => {
  setFacadeBorderRadius(`0.5rem`);
});

document.addEventListener(`astro:page-load`, () => zoom.detach());
