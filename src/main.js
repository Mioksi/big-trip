import {EVENTS_AMOUNT, Place} from './common/consts';
import {render} from './common/utils/render';
import {generateTripEvents} from './mock/event';
import {getTripDays} from './components/main/day/utils/utils';
import TripInfoComponent from './components/header/trip-info/trip-info';
import MenuComponent from './components/header/menu/menu';
import FiltersComponent from './components/header/filters/filters';
import SortingComponent from './components/main/sorting/sorting';
import DayListComponent from './components/main/day/day-list';
import NoEventsComponent from './components/main/event/no-events';
import TripController from './controllers/trip';

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripControlsHeaders = tripControls.querySelectorAll(`h2`);
const tripEvents = document.querySelector(`.trip-events`);

const [firstTitle, secondTitle] = tripControlsHeaders;

const events = generateTripEvents(EVENTS_AMOUNT);

events.sort((first, second) => first.startTime - second.startTime);

const allDays = getTripDays(events);

const renderEvents = (dayListComponent, tripController) => {
  if (events.length === 0) {
    render(tripEvents, new NoEventsComponent());
    return;
  }

  render(tripEvents, new SortingComponent());
  render(tripEvents, dayListComponent);

  tripController.render(events, allDays);
};

const init = () => {
  const dayListComponent = new DayListComponent();
  const tripController = new TripController(dayListComponent);

  render(tripMain, new TripInfoComponent(events), Place.AFTERBEGIN);
  render(firstTitle, new MenuComponent(), Place.AFTEREND);
  render(secondTitle, new FiltersComponent(), Place.AFTEREND);

  renderEvents(dayListComponent, tripController);
};

init();
