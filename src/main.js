import {EVENTS_AMOUNT, Place} from './common/consts';
import {render} from './common/utils/render';
import {generateTripEvents} from './mock/event';
import TripInfoComponent from './components/header/trip-info/trip-info';
import MenuComponent from './components/header/menu/menu';
import TripController from './controllers/trip';
import PointsModel from './models/points';
import FilterController from './controllers/filter';

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripControlsHeaders = tripControls.querySelectorAll(`h2`);
const tripEvents = document.querySelector(`.trip-events`);
const eventAddButton = tripMain.querySelector(`.trip-main__event-add-btn`);

const [firstTitle, secondTitle] = tripControlsHeaders;

const events = generateTripEvents(EVENTS_AMOUNT);

const init = () => {
  const pointsModel = new PointsModel();

  pointsModel.setPoints(events);

  const tripController = new TripController(tripEvents, pointsModel);
  const filterController = new FilterController(secondTitle, pointsModel);

  render(tripMain, new TripInfoComponent(events), Place.AFTERBEGIN);
  render(firstTitle, new MenuComponent(), Place.AFTEREND);
  filterController.render();
  tripController.render();

  eventAddButton.addEventListener(`click`, () => {
    tripController.createPoint();
  });
};

init();
