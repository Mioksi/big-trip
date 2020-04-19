import {EVENTS_AMOUNT, Place} from './common/consts';
import {render} from './common/utils';
import {generateTripEvents} from './mock/event';
import {getTripDays} from './components/main/day/utils/utils';
import {renderDay} from './components/main/day/utils/render-day';
import {renderEvent} from './components/main/event/utils/render-event';
import TripInfoComponent from './components/header/trip-info/trip-info';
import MenuComponent from './components/header/menu/menu';
import FiltersComponent from './components/header/filters/filters';
import SortingComponent from './components/main/sorting/sorting';
import DayListComponent from './components/main/day/day-list';

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripControlsHeaders = tripControls.querySelectorAll(`h2`);
const tripEvents = document.querySelector(`.trip-events`);

const [firstTitle, secondTitle] = tripControlsHeaders;

const events = generateTripEvents(EVENTS_AMOUNT);

events.sort((first, second) => first.startTime - second.startTime);

const allDays = getTripDays(events);

const renderDays = (container) => {
  allDays.map((day, index) => renderDay(container, day, index));

  const days = container.querySelectorAll(`.day`);

  days.forEach((day) => {
    const dayDate = day.querySelector(`.day__date`);
    const dateTime = new Date(dayDate.dateTime);

    const eventList = day.querySelector(`.trip-events__list`);

    for (let event of events) {
      if (event.startTime.getDate() === dateTime.getDate()) {
        renderEvent(eventList, event);
      }
    }
  });
};

const init = () => {
  const dayListComponent = new DayListComponent().getElement();

  render(tripMain, new TripInfoComponent(events).getElement(), Place.AFTERBEGIN);
  render(firstTitle, new MenuComponent().getElement(), Place.AFTEREND);
  render(secondTitle, new FiltersComponent().getElement(), Place.AFTEREND);
  render(tripEvents, new SortingComponent().getElement());
  render(tripEvents, dayListComponent);
  renderDays(dayListComponent);
};

init();
