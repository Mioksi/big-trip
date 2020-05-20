const isCheckedFilter = (checked) => checked ? `checked` : ``;
const isDisabledFilter = (disabled) => disabled ? `disabled` : ``;

const createFilter = (filter) => {
  const {name, checked, disabled} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${name}"
        ${isCheckedFilter(checked)}
        ${isDisabledFilter(disabled)}
      >
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

export {createFilter};
