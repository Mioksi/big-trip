import {createTripInfoMain} from './components/trip-info-main';
import {createTripPrice} from './components/trip-price';
import AbstractComponent from '../../abstracts/abstract-component';

const createTripInfo = (events) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
       ${createTripInfoMain(events)}
       ${createTripPrice(events)}
     </section>`
  );
};

export default class TripInfo extends AbstractComponent {
  constructor(events) {
    super();

    this._events = events;
  }

  getTemplate() {
    return createTripInfo(this._events);
  }
}
