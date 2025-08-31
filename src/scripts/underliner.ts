// this is sort of a re-implementation of an effect I first saw on Xetera's (https://xetera.dev/) blog
// which this blog draws a lot of inspiration upon and that uses a package called rough-notation which
// doesn't jive quite well with astro view transitions thus this custom code here
//
// this might be possible to implement on the server so there's no JS required at all though I'm unsure
// because of varying font sizes from device to device etc.

const createUnderliner = (parent: HTMLElement): [() => void, () => void] => {
  parent.style.position = `relative`;
  parent.style.display = `inline-block`;

  let currentAnnotation: SVGElement | undefined = undefined;

  const animateIn = () => {
    if (currentAnnotation) currentAnnotation.remove();

    const remSize = Number.parseFloat(
      getComputedStyle(parent).fontSize.replaceAll(/[^\d.]/g, ``),
    );
    const height = remSize / 3;
    const heightVariation = height / 2;
    const width = Number.parseFloat(
      getComputedStyle(parent).width.replaceAll(/[^\d.]/g, ``),
    );
    const widthOffset = width / 3;
    const boxHeight = getComputedStyle(parent).height;

    const randomHeight = () =>
      Math.random() * heightVariation * 2 - heightVariation + height / 2;

    const pathData = `M0,${randomHeight()} C${widthOffset},${randomHeight()} ${width - widthOffset},${randomHeight()} ${width},${randomHeight()} C${width - widthOffset},${randomHeight()} ${widthOffset},${randomHeight()} 0,${randomHeight()}`;

    const path = document.createElementNS(`http://www.w3.org/2000/svg`, `path`);
    path.setAttribute(`d`, pathData);
    path.setAttribute(`stroke`, `currentColor`);
    path.setAttribute(`stroke-width`, `${heightVariation / 2}`);
    path.setAttribute(`stroke-linejoin`, `bevel`);
    path.setAttribute(`fill`, `none`);

    const svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
    svg.setAttribute(`viewBox`, `0 0 ${width} ${height}`);
    svg.append(path);

    svg.style.position = `absolute`;
    svg.style.top = `calc(${boxHeight} - 0.5rem)`;
    svg.style.userSelect = `none`;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    path.style.animation = `drawIn 800ms ease-out`;
    path.style.animationFillMode = `forwards`;

    parent.append(svg);
    currentAnnotation = svg;
  };

  const animateOut = () => {
    const current = currentAnnotation;
    currentAnnotation = undefined;

    if (!current) return;
    current.classList.add(`fade-out`);
    current.addEventListener(`animationend`, (e) => {
      if (e.animationName === `fadeOut`) current.remove();
    });
  };

  return [animateIn, animateOut];
};

const createUnderliners = () => {
  const articleLinks = document.querySelectorAll(`.article-link`);
  articleLinks.forEach((articleLink) => {
    const element = articleLink as HTMLElement;
    const child = element.querySelector(`.article-title`) as HTMLElement;
    if (!child) return;

    const [animateIn, animateOut] = createUnderliner(child);

    element.addEventListener(`mouseenter`, animateIn);
    element.addEventListener(`mouseleave`, animateOut);
  });
};

document.addEventListener(`astro:page-load`, createUnderliners);
