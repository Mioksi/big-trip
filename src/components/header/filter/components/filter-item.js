const isCheckedFilter = (checked) => checked ? `checked` : ``;

const createFilter = (filter) => {
  const {name, checked} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${name}"
        ${isCheckedFilter(checked)}
      >
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

export {createFilter};
