import {createTripInfoMain} from './components/trip-info-main';
import {createElement} from '../../../common/utils';
import {createTripPrice} from './components/trip-price';

const createTripInfo = (events) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
       ${createTripInfoMain(events)}
       ${createTripPrice(events)}
     </section>`
  );
};

export default class TripInfo {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripInfo(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
