import {EVENTS_AMOUNT, Place, MenuItem} from './common/consts';
import {render} from './common/utils/render';
import {generateTripEvents} from './mock/event';
import TripInfoComponent from './components/header/trip-info/trip-info';
import MenuComponent from './components/header/menu/menu';
import StatisticsComponent from './components/header/statistics/statistics';
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

  const menuComponent = new MenuComponent();
  const statisticsComponent = new StatisticsComponent(pointsModel);
  const tripController = new TripController(tripEvents, pointsModel);
  const filterController = new FilterController(secondTitle, pointsModel);

  render(tripMain, new TripInfoComponent(events), Place.AFTERBEGIN);
  render(firstTitle, menuComponent, Place.AFTEREND);
  filterController.render();
  tripController.render();

  render(tripEvents, statisticsComponent);
  statisticsComponent.hide();

  menuComponent.setMenuItemChangeHandler((menuItem) => {
    switch (menuItem) {
      case MenuItem.TABLE:
        menuComponent.setActiveItem(MenuItem.TABLE);
        statisticsComponent.hide();
        tripController.show();
        break;
      case MenuItem.STATS:
        menuComponent.setActiveItem(MenuItem.STATS);
        tripController.hide();
        statisticsComponent.show();
        break;
    }
  });

  eventAddButton.addEventListener(`click`, () => {
    tripController.createPoint();
  });
};

init();
