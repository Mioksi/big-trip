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
  constructor(container, pointModel) {
    this._container = container;
    this._pointModel = pointModel;

    this._pointControllers = [];

    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();
    // this._noEventsComponent = new NoEventsComponent();
    this._creatingPoint = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointModel.setFilterChangeHandler(this._onFilterChange);
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
    const events = this._pointModel.getPoints();

    const container = this._container;
    const dayList = this._dayListComponent.getElement();

    // if (events.length === 0) {
    //   render(container, this._noEventsComponent);
    //
    //   return;
    // }

    render(container, this._sortComponent);
    render(container, this._dayListComponent);

    this._renderEventsByDays(events, dayList);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    const dayList = this._dayListComponent.getElement();
    const destinations = this._pointModel.getDestinations();
    const offers = this._pointModel.getOffers();

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
    const destinations = this._pointModel.getDestinations();
    const offers = this._pointModel.getOffers();

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
    const destinations = this._pointModel.getDestinations();
    const offers = this._pointModel.getOffers();

    render(dayList, day);

    const tripEventsList = day.getElement().querySelector(`.trip-events__list`);

    this._pointControllers = renderEvents(tripEventsList, sortedEvents, this._onDataChange, this._onViewChange, destinations, offers);
  }

  _updateEvents() {
    const dayList = this._dayListComponent.getElement();

    dayList.innerHTML = ``;

    this._removeEvents();
    this._renderEventsByDays(this._pointModel.getPoints(), dayList);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData.id === emptyPoint.id) {
      this._creatingPoint = null;

      if (newData === null) {
        pointController.destroy();
        this._updateEvents();
      } else {
        this._pointModel.addPoint(newData);
        this._updateEvents();

        this._pointControllers = [].concat(pointController, this._pointControllers);
      }
    } else if (newData === null) {
      this._pointModel.removePoint(oldData.id);
      this._updateEvents();
    } else {
      const isSuccess = this._pointModel.updatePoint(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, Mode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedEvents(this._pointModel.getPoints(), sortType);
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
