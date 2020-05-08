import {FILTER_ID_PREFIX} from '../../../common/consts';
import {createFilter} from './components/filter-item';
import AbstractComponent from '../../abstracts/abstract-component';

const getFilterNameById = (id) => id.substring(FILTER_ID_PREFIX.length);

const createFilters = (filters) => {
  const filtersMarkup = filters.map(createFilter).join(``);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  getTemplate() {
    return createFilters(this._filters);
  }

  _onFilterChange(handler) {
    return (evt) => {
      const filterName = getFilterNameById(evt.target.id);

      handler(filterName);
    };
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, this._onFilterChange(handler));
  }
}
