import {SortType, Mode, emptyPoint} from '../common/consts';
import {render} from '../common/utils/render';
import {getDefaultSortedEvents} from '../common/utils/helpers';
import {getTripDays} from '../components/main/day/utils/utils';
import DayItemComponent from '../components/main/day/day-item';
import NoEventsComponent from '../components/main/event/no-events';
import SortComponent from '../components/main/sorting/sort';
import DayListComponent from '../components/main/day/day-list';
import PointController from './point';

const renderEvents = (tripEventsList, events, onDataChange, onViewChange, offers, destinations) => {
  return events.map((event) => {
    const pointController = new PointController(tripEventsList, onDataChange, onViewChange, offers, destinations);

    pointController.render(event, Mode.DEFAULT);

    return pointController;
  });
};

const renderDay = (container, day, index) => {
  const dayItemComponent = new DayItemComponent(day, index);

  render(container, dayItemComponent);
};

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedEvents = showingEvents.sort((first, second) => {
        return (second.endTime - second.startTime) - (first.endTime - first.startTime);
      });
      break;
    case SortType.PRICE:
      sortedEvents = showingEvents.sort((first, second) => second.price - first.price);
      break;
    case SortType.EVENT:
      sortedEvents = showingEvents;
      break;
  }

  return sortedEvents;
};

export default class TripController {
  constructor(container, pointsModel, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._api = api;

    this._pointControllers = [];

    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._creatingPoint = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._sortComponent.hide();
    this._dayListComponent.hide();
  }

  show() {
    this._sortComponent.show();
    this._dayListComponent.show();
  }

  render() {
    const events = this._pointsModel.getPoints();

    const container = this._container;
    const dayList = this._dayListComponent.getElement();

    if (!events.length) {
      render(container, this._noEventsComponent);

      return;
    }

    render(container, this._sortComponent);
    render(container, this._dayListComponent);

    this._renderEventsByDays(events, dayList);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    const dayList = this._dayListComponent.getElement();
    const destinations = this._pointsModel.getDestinations();
    const offers = this._pointsModel.getOffers();

    this._creatingPoint = new PointController(dayList, this._onDataChange, this._onViewChange, destinations, offers);

    this._creatingPoint.render(emptyPoint, Mode.ADDING);
    this._pointControllers = this._pointControllers.concat(this._creatingPoint);
  }

  _removeEvents() {
    this._pointControllers.forEach((pointController) => pointController.destroy());
    this._pointControllers = [];
  }

  _renderEventsByDays(events, dayList) {
    const sortedEvents = getDefaultSortedEvents(events);
    const allDays = getTripDays(sortedEvents);
    const destinations = this._pointsModel.getDestinations();
    const offers = this._pointsModel.getOffers();

    allDays.map((day, index) => renderDay(dayList, day, index + 1));

    const days = this._container.querySelectorAll(`.day`);

    const getDayItem = (day) => {
      const dayDate = day.querySelector(`.day__date`);
      const dateTime = new Date(dayDate.dateTime);

      const eventList = day.querySelector(`.trip-events__list`);

      const filterEvents = sortedEvents.filter((event) => event.startTime.getDate() === dateTime.getDate());

      const newPoints = renderEvents(eventList, filterEvents, this._onDataChange, this._onViewChange, destinations, offers);

      this._pointControllers = this._pointControllers.concat(newPoints);
    };

    days.forEach(getDayItem);
  }

  _renderAllEvents(sortedEvents, dayList) {
    const day = new DayItemComponent(null);
    const destinations = this._pointsModel.getDestinations();
    const offers = this._pointsModel.getOffers();

    render(dayList, day);

    const tripEventsList = day.getElement().querySelector(`.trip-events__list`);

    this._pointControllers = renderEvents(tripEventsList, sortedEvents, this._onDataChange, this._onViewChange, destinations, offers);
  }

  _updateEvents() {
    const dayList = this._dayListComponent.getElement();

    dayList.innerHTML = ``;

    this._removeEvents();
    this._renderEventsByDays(this._pointsModel.getPoints(), dayList);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData.id === emptyPoint.id) {
      this._creatingPoint = null;

      if (newData === null) {
        pointController.destroy();
        this._updateEvents();
      } else {
        this._api.createPoint(newData)
          .then((pointModel) => {
            this._pointsModel.addPoint(pointModel);
            this._updateEvents();
          });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._pointsModel.removePoint(oldData.id);
          this._updateEvents();
        });
    } else {
      this._api.updatePoint(oldData.id, newData)
        .then((pointModel) => {
          const isSuccess = this._pointsModel.updatePoint(oldData.id, pointModel);

          if (isSuccess) {
            pointController.render(pointModel, Mode.DEFAULT);
            this._updateEvents();
          }
        });
    }
  }

  _onViewChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedEvents(this._pointsModel.getPoints(), sortType);
    const dayList = this._dayListComponent.getElement();

    dayList.innerHTML = ``;

    if (sortType === SortType.EVENT) {
      this._renderEventsByDays(sortedEvents, dayList);
    } else {
      this._renderAllEvents(sortedEvents, dayList);
    }
  }

  _onFilterChange() {
    this._updateEvents();
  }
}
