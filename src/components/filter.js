const createFilterMarkup = (filter, isChecked, isDisabled) => {
  const {title, count} = filter;
  return (
    `    <input
    type="radio"
    id="filter__${title}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
    ${isDisabled ? `disabled` : ``}
  />
  <label for="filter__${title}" class="filter__label">
    ${title} <span class="filter__${title}-count">${count}</span></label
  >
`
  );
};

export const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0, i === 1)).join(`\n`);
  return (
    `      <section class="main__filter filter container">
    ${filtersMarkup}
  </section>
`
  );
};
