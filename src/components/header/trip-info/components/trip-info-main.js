import {getTripRoute, getTripDate} from '../utils/utils';

const createTripInfoMain = (events) => {
  const title = getTripRoute(events);
  const date = getTripDate(events);

  return (
    `<div class="trip-info__main">
       <h1 class="trip-info__title">${title}</h1>
       <p class="trip-info__dates">${date}</p>
     </div>`
  );
};

export {createTripInfoMain};
