import {EVENTS_AMOUNT, Place} from './common/consts';
import {render} from './common/utils';
import {generateTripEvents} from './mock/event';
import {getTripDays} from './components/main/day/utils/utils';
import {renderDays} from './components/main/day/utils/render-days';
import TripInfoComponent from './components/header/trip-info/trip-info';
import MenuComponent from './components/header/menu/menu';
import FiltersComponent from './components/header/filters/filters';
import SortingComponent from './components/main/sorting/sorting';
import DayListComponent from './components/main/day/day-list';
import NoEventsComponent from './components/main/event/components/no-events';

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripControlsHeaders = tripControls.querySelectorAll(`h2`);
const tripEvents = document.querySelector(`.trip-events`);

const [firstTitle, secondTitle] = tripControlsHeaders;

const events = generateTripEvents(EVENTS_AMOUNT);

events.sort((first, second) => first.startTime - second.startTime);

const allDays = getTripDays(events);

const renderEvents = (dayListComponent) => {
  if (events.length === 0) {
    render(tripEvents, new NoEventsComponent().getElement());
    return;
  }

  render(tripEvents, new SortingComponent().getElement());
  render(tripEvents, dayListComponent);
  renderDays(dayListComponent, allDays, events);
};

const init = () => {
  const dayListComponent = new DayListComponent().getElement();

  render(tripMain, new TripInfoComponent(events).getElement(), Place.AFTERBEGIN);
  render(firstTitle, new MenuComponent().getElement(), Place.AFTEREND);
  render(secondTitle, new FiltersComponent().getElement(), Place.AFTEREND);
  renderEvents(dayListComponent);
};

init();
