import {MAX_DESTINATIONS, MONTHS} from '../../../../common/consts';

export const getTripRoute = (events) => {
  const tripDestinations = events.map((tripEvent) => tripEvent.city);

  if (tripDestinations.length <= MAX_DESTINATIONS) {
    tripDestinations.join(` &mdash; `);
  }

  return `${tripDestinations[0]} &mdash; … &mdash; ${tripDestinations[tripDestinations.length - 1]}`;
};

export const getTripDate = (events) => {
  const startDate = events[0].startTime;
  const endDate = events[events.length - 1].endTime;

  return `${MONTHS[startDate.getMonth()]} ${startDate.getDate()} &nbsp;&mdash;&nbsp; ${endDate.getDate()} ${MONTHS[endDate.getMonth()]}`;
};

export const calculateOffersPrice = (offers) => {
  return offers ? offers.reduce((total, offer) => total + offer.price, 0) : 0;
};

export const calculateEventsPrice = (events) => {
  return events.reduce((total, event) => total + event.price + calculateOffersPrice(event.offers), 0);
};
