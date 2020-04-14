import {Place} from './common/consts';
import {createTripInfo} from './components/header/trip-info';
import {createMenu} from './components/header/menu';
import {createFilters} from './components/header/filter';
import {createSorting} from './components/header/sorting';
import {createFormEdit} from './components/event/event-edit';
import {createDayList} from './components/day/day-list';
import {render} from './common/utils';
import {events} from './components/day/day-item';

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripControlsHeaders = tripControls.querySelectorAll(`h2`);
const tripEvents = document.querySelector(`.trip-events`);

const [firstTitle, secondTitle] = tripControlsHeaders;

const init = () => {
  render(tripMain, createTripInfo(events), Place.AFTERBEGIN);
  render(firstTitle, createMenu(), Place.AFTEREND);
  render(secondTitle, createFilters(), Place.AFTEREND);
  render(tripEvents, createSorting());
  render(tripEvents, createFormEdit(events[0]));
  render(tripEvents, createDayList());
};

init();
