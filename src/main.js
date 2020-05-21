import API from './api/api';
import Provider from "./api/provider.js";
import Store from './api/store';
import FilterController from './controllers/filter';
import MenuComponent from './components/header/menu/menu';
import PointsModel from './models/points';
import StatisticsComponent from './components/header/statistics/statistics';
import TripController from './controllers/trip';
import TripInfoController from './controllers/trip-info';
import LoadingEventsComponent from './components/main/event/loading-events';
import {AUTHORIZATION, END_POINT, STORE_NAME, Place, MenuItem} from './common/consts';
import {render, remove} from './common/utils/render';

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripControlsHeaders = tripControls.querySelectorAll(`h2`);
const tripEvents = document.querySelector(`.trip-events`);
const eventAddButton = tripMain.querySelector(`.trip-main__event-add-btn`);

const [firstTitle, secondTitle] = tripControlsHeaders;

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const pointsModel = new PointsModel();

const loadingEvents = new LoadingEventsComponent();
const menuComponent = new MenuComponent();
const statisticsComponent = new StatisticsComponent(pointsModel);
const tripController = new TripController(tripEvents, eventAddButton, pointsModel, apiWithProvider);
const tripInfoController = new TripInfoController(tripMain, pointsModel);
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

const onAddEventButtonClick = () => {
  showTable();

  filterController.setDefaultFilter();
  tripController.createPoint();
};

const loadData = (points, offers, destinations) => {
  pointsModel.setPoints(points);
  pointsModel.setOffers(offers);
  pointsModel.setDestinations(destinations);
  remove(loadingEvents);
  tripController.render();
};

const init = () => {
  tripInfoController.render();
  render(firstTitle, menuComponent, Place.AFTEREND);
  filterController.render();
  render(tripEvents, loadingEvents);

  render(tripEvents, statisticsComponent);
  statisticsComponent.hide();

  menuComponent.setMenuItemChangeHandler((menuItem) => menuTab[menuItem]());

  eventAddButton.addEventListener(`click`, onAddEventButtonClick);

  Promise.all([apiWithProvider.getPoints(), apiWithProvider.getOffers(), apiWithProvider.getDestinations()])
    .then(([points, offers, destinations]) => loadData(points, offers, destinations));

  window.addEventListener(`load`, () => {
    navigator.serviceWorker.register(`/sw.js`);
  });

  window.addEventListener(`online`, () => {
    document.title = document.title.replace(` [offline]`, ``);

    apiWithProvider.sync();
  });

  window.addEventListener(`offline`, () => {
    document.title += ` [offline]`;
  });
};

init();
