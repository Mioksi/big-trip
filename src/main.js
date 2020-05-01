import {EVENTS_AMOUNT, Place} from './common/consts';
import {render} from './common/utils/render';
import {generateTripEvents} from './mock/event';
import TripInfoComponent from './components/header/trip-info/trip-info';
import MenuComponent from './components/header/menu/menu';
import FiltersComponent from './components/header/filters/filters';
import TripController from './controllers/trip';

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripControlsHeaders = tripControls.querySelectorAll(`h2`);
const tripEvents = document.querySelector(`.trip-events`);

const [firstTitle, secondTitle] = tripControlsHeaders;

const events = generateTripEvents(EVENTS_AMOUNT);
events.sort((first, second) => first.startTime - second.startTime);

const init = () => {
  const tripController = new TripController(tripEvents);

  render(tripMain, new TripInfoComponent(events), Place.AFTERBEGIN);
  render(firstTitle, new MenuComponent(), Place.AFTEREND);
  render(secondTitle, new FiltersComponent(), Place.AFTEREND);

  tripController.render(events);
};

init();
