import {calculateEventsPrice} from '../utils/utils';

const createTripPrice = (events) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateEventsPrice(events)}</span>
  </p>`
);

export {createTripPrice};
