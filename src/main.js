import {createTripInfo} from './components/trip-info.js';
import {createTripPrice} from './components/trip-price.js';
import {createMenu} from './components/menu.js';
import {createFilters} from './components/filter.js';
import {createSorting} from './components/sorting.js';
import {createFormEdit} from './components/form-edit.js';
import {createDayList} from './components/day-list.js';
import {createDayItem} from './components/day.js';
import {createEventItem} from './components/event.js';

const POINT_AMOUNT = 3;

const Place = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`
};

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripControlsHeaders = tripControls.querySelectorAll(`h2`);
const tripEvents = document.querySelector(`.trip-events`);

const [firstTitle, secondTitle] = tripControlsHeaders;

const render = (container, template, place = Place.BEFOREEND) => container.insertAdjacentHTML(place, template);

const renderEventList = (container) => {
  for (let i = 0; i < POINT_AMOUNT; i++) {
    render(container, createEventItem());
  }
};

const init = () => {
  render(tripMain, createTripInfo(), Place.AFTERBEGIN);

  const tripInfo = tripMain.querySelector(`.trip-info`);

  render(tripInfo, createTripPrice());
  render(firstTitle, createMenu(), Place.AFTEREND);
  render(secondTitle, createFilters(), Place.AFTEREND);
  render(tripEvents, createSorting());
  render(tripEvents, createFormEdit());
  render(tripEvents, createDayList());

  const tripDays = tripEvents.querySelector(`.trip-days`);

  render(tripDays, createDayItem());

  const tripEventsList = tripDays.querySelector(`.trip-events__list`);

  renderEventList(tripEventsList);
};

init();
