import {createDayItems} from "./day-item";
import {generateTripEvents} from '../../mock/event';
import {EVENTS_AMOUNT} from '../../common/consts';

const events = generateTripEvents(EVENTS_AMOUNT);

events.sort((first, second) => first.startTime - second.startTime);

const getTripDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const getTripDays = (dates) => {
  return Array.from(new Set(dates.map((date) => Date.parse(getTripDate(date.startTime)))));
};

const tripDays = getTripDays(events);

const createDayList = () => `<ul class="trip-days">${createDayItems(tripDays)}</ul>`;

export {events, createDayList};
