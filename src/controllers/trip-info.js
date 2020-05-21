import TripInfoComponent from '../components/header/trip-info/trip-info';
import {Place} from '../common/consts';
import {render, replace} from '../common/utils/render';
import {getDefaultSortedEvents} from '../common/utils/helpers';

export default class TripInfo {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._tripInfoComponent = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const oldComponent = this._tripInfoComponent;
    const sortedPoints = getDefaultSortedEvents(this._pointsModel.getPointsAll());

    this._tripInfoComponent = new TripInfoComponent(sortedPoints);

    if (oldComponent) {
      replace(this._tripInfoComponent, oldComponent);
    } else {
      render(container, this._tripInfoComponent, Place.AFTERBEGIN);
    }
  }

  _onDataChange() {
    this.render();
  }
}
