import { zoom } from '@/utils/zoom';

document.addEventListener(`astro:page-load`, () =>
  zoom.attach(
    `.prose :where(img):not(:where([class~="not-prose"],[class~="not-prose"] *))`,
  ),
);
