import {FilterType, Place} from '../common/consts';
import {render, replace} from '../common/utils/render';
import {getPointsByFilter} from '../common/utils/filter';
import FilterComponent from '../components/header/filter/filter';

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allPoints = this._pointsModel.getPointsAll();
    const filters = Object.values(FilterType).map((filterType) => this._getFilter(filterType, allPoints));
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, Place.AFTEREND);
    }
  }

  setDefaultFilter() {
    this._pointsModel.setFilter(FilterType.EVERYTHING);
    this._activeFilterType = FilterType.EVERYTHING;

    this._onDataChange();
  }

  _getFilter(filterType, allPoints) {
    return {
      name: filterType,
      checked: filterType === this._activeFilterType,
      disabled: getPointsByFilter(allPoints, filterType).length === 0,
    };
  }

  _onFilterChange(filterType) {
    this._pointsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
