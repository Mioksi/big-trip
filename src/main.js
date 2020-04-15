import {Place} from './common/consts';
import {createTripInfo} from './components/header/trip-info';
import {createMenu} from './components/header/menu';
import {createFilters} from './components/header/filter';
import {createSorting} from './components/header/sorting';
import {createFormEdit} from './components/event/event-edit';
import {createDayList} from './components/day/day-list';
import {render} from './common/utils';
import {events} from './components/day/day-list';
import {createEventItem} from './components/event/event-item';

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

  const days = document.querySelectorAll(`.day`);

  days.forEach((day) => {
    const dayDateElement = day.querySelector(`.day__date`);
    const dateTime = new Date(dayDateElement.dateTime);

    const trips = day.querySelector(`.trip-events__list`);

    for (let event of events) {
      if (event.startTime.getDate() === dateTime.getDate()) {
        render(trips, createEventItem(event));
      }
    }
  });
};

init();
