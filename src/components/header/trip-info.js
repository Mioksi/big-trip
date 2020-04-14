import {MAX_DESTINATIONS, MONTHS} from "../../common/consts";
import {createTripPrice} from './trip-price';

const getTripRoute = (events) => {
  const tripDestinations = events.map((tripEvent) => tripEvent.city);

  if (tripDestinations.length <= MAX_DESTINATIONS) {
    tripDestinations.join(` &mdash; `);
  }

  return `${tripDestinations[0]} &mdash; … &mdash; ${tripDestinations[tripDestinations.length - 1]}`;
};

const getTripDate = (events) => {
  const startDate = events[0].startTime;
  const endDate = events[events.length - 1].endTime;

  return `${MONTHS[startDate.getMonth()]} ${startDate.getDate()} &nbsp;&mdash;&nbsp; ${endDate.getDate()} ${MONTHS[endDate.getMonth()]}`;
};

const createTripInfo = (events) => {
  const title = getTripRoute(events);
  const date = getTripDate(events);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">${date}</p>
      </div>
      ${createTripPrice()}
    </section>`
  );
};

export {createTripInfo};
