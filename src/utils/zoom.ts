import '@/styles/zoom.css';
import mediumZoom from 'medium-zoom/dist/pure';

export const zoom = mediumZoom({ margin: 12, background: 'rgba(0, 0, 0, 0.4)', scrollOffset: 50 });

const setFacadeBorderRadius = (borderRadius: string) => {
  const activeImage = document.querySelector(
    'img.medium-zoom-image.medium-zoom-image--opened',
  ) as HTMLElement | null;
  if (activeImage) activeImage.style.borderRadius = borderRadius;
};

zoom.on('open', () => {
  window.requestAnimationFrame(() => {
    setFacadeBorderRadius('0');
  });
});

zoom.on('close', () => {
  setFacadeBorderRadius('0.5rem');
});

document.addEventListener('astro:page-load', () => zoom.detach());
