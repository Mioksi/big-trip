import API from './api/api';
import FilterController from './controllers/filter';
import MenuComponent from './components/header/menu/menu';
import PointsModel from './models/points';
import StatisticsComponent from './components/header/statistics/statistics';
import TripController from './controllers/trip';
import TripInfoComponent from './components/header/trip-info/trip-info';
import {AUTHORIZATION, END_POINT, Place, MenuItem} from './common/consts';
import {render} from './common/utils/render';

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripControlsHeaders = tripControls.querySelectorAll(`h2`);
const tripEvents = document.querySelector(`.trip-events`);
const eventAddButton = tripMain.querySelector(`.trip-main__event-add-btn`);

const [firstTitle, secondTitle] = tripControlsHeaders;

const init = () => {
  const api = new API(END_POINT, AUTHORIZATION);
  const pointsModel = new PointsModel();

  const menuComponent = new MenuComponent();
  const statisticsComponent = new StatisticsComponent(pointsModel);
  const tripController = new TripController(tripEvents, pointsModel, api);
  const filterController = new FilterController(secondTitle, pointsModel);

  const showTable = () => {
    menuComponent.setActiveItem(MenuItem.TABLE);
    statisticsComponent.hide();
    tripController.show();
  };

  const showStats = () => {
    menuComponent.setActiveItem(MenuItem.STATS);
    tripController.hide();
    statisticsComponent.show();
  };

  const menuTab = {
    'Table': showTable,
    'Stats': showStats,
  };

  render(firstTitle, menuComponent, Place.AFTEREND);
  filterController.render();
  tripController.render();

  render(tripEvents, statisticsComponent);
  statisticsComponent.hide();

  menuComponent.setMenuItemChangeHandler((menuItem) => menuTab[menuItem]());

  eventAddButton.addEventListener(`click`, () => {
    tripController.createPoint();
  });

  Promise.all([api.getPoints(), api.getOffers(), api.getDestinations()])
    .then(([points, offers, destinations]) => {
      pointsModel.setPoints(points);
      pointsModel.setOffers(offers);
      pointsModel.setDestinations(destinations);
      render(tripMain, new TripInfoComponent(points), Place.AFTERBEGIN);
      tripController.render();
    });
};

init();
