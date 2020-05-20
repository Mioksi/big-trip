import {MAX_DESTINATIONS} from '../../../../common/consts';
import {formatMonth, formatDay} from '../../../../common/utils/helpers';

export const getTripRoute = (events) => {
  const tripDestinations = events.map((event) => event.destination.name);

  if (tripDestinations.length <= MAX_DESTINATIONS) {
    tripDestinations.join(` &mdash; `);
  }

  return `${tripDestinations[0]} &mdash; … &mdash; ${tripDestinations[tripDestinations.length - 1]}`;
};

export const getTripDate = (events) => {
  const startDate = events[0].startTime;
  const endDate = events[events.length - 1].endTime;
  const startMonth = formatMonth(startDate);
  const endMonth = formatMonth(endDate);
  const startDay = formatDay(startDate);
  const endDay = formatDay(endDate);

  return `${startMonth} ${startDay} &nbsp;&mdash;&nbsp; ${endMonth} ${endDay}`;
};

export const calculateOffersPrice = (offers) => offers.reduce((total, offer) => total + offer.price, 0);

export const calculateEventsPrice = (events) => {
  return events.reduce((total, event) => total + event.price + calculateOffersPrice(event.offers), 0);
};
