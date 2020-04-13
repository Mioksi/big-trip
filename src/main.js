import {Place} from './common/consts';
import {createTripInfo} from './components/trip-info';
import {createMenu} from './components/menu';
import {createFilters} from './components/filter';
import {createSorting} from './components/sorting';
import {createFormEdit} from './components/form-edit';
import {createDayList} from './components/day-list';
import {render} from './common/utils';

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripControlsHeaders = tripControls.querySelectorAll(`h2`);
const tripEvents = document.querySelector(`.trip-events`);

const [firstTitle, secondTitle] = tripControlsHeaders;

const init = () => {
  render(tripMain, createTripInfo(), Place.AFTERBEGIN);
  render(firstTitle, createMenu(), Place.AFTEREND);
  render(secondTitle, createFilters(), Place.AFTEREND);
  render(tripEvents, createSorting());
  render(tripEvents, createFormEdit());
  render(tripEvents, createDayList());
};

init();
