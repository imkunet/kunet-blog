const localizeDatePublished = () => {
  const elements = document.querySelectorAll(
    `[data-date]`,
  ) as unknown as HTMLElement[];

  elements.forEach((element) => {
    const date = element.dataset.date;
    if (!date) return;

    element.textContent = new Date(
      Number.parseInt(date, 10),
    ).toLocaleDateString(undefined, {
      day: `numeric`,
      month: `long`,
      timeZone: `UTC`,
      year: `numeric`,
    });

    delete element.dataset.date;
  });
};

document.addEventListener(`astro:page-load`, () => localizeDatePublished());
