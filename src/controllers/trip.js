import {SortType} from '../common/consts';
import {isEscEvent} from '../common/utils/helpers';
import {render, replace} from '../common/utils/render';
import EventItemComponent from '../components/main/event/event-item';
import EventEditComponent from '../components/main/event/event-edit';
import DayItemComponent from '../components/main/day/day-item';
import NoEventsComponent from '../components/main/event/no-events';
import SortComponent from '../components/main/sorting/sort';
import DayListComponent from '../components/main/day/day-list';

const renderEvent = (container, event) => {
  const eventItemComponent = new EventItemComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventItemComponent);
  };

  const replaceEditToEvent = () => {
    replace(eventItemComponent, eventEditComponent);
  };

  const onFormEscPress = (evt) => {
    isEscEvent(evt, replaceEditToEvent);

    document.removeEventListener(`keydown`, onFormEscPress);
  };

  const onRollupButtonClick = () => {
    replaceEventToEdit();

    document.addEventListener(`keydown`, onFormEscPress);
  };

  const onFormSave = (evt) => {
    evt.preventDefault();

    replaceEditToEvent();

    document.removeEventListener(`keydown`, onFormEscPress);
  };

  eventItemComponent.setRollupButtonClickHandler(onRollupButtonClick);
  eventEditComponent.setSubmitHandler(onFormSave);

  render(container, eventItemComponent);
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
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();
    this._noEventsComponent = new NoEventsComponent();
  }

  render(events, allDays) {
    const container = this._container;
    const dayList = this._dayListComponent.getElement();

    if (events.length === 0) {
      render(container, this._noEventsComponent);

      return;
    }

    render(container, this._sortComponent);
    render(container, this._dayListComponent);

    const renderEventsByDays = (tripEvents) => {
      allDays.map((day, index) => renderDay(dayList, day, index + 1));

      const days = container.querySelectorAll(`.day`);

      const getDayItem = (day) => {
        const dayDate = day.querySelector(`.day__date`);
        const dateTime = new Date(dayDate.dateTime);

        const eventList = day.querySelector(`.trip-events__list`);

        for (let event of tripEvents) {
          if (event.startTime.getDate() === dateTime.getDate()) {
            renderEvent(eventList, event);
          }
        }
      };

      days.forEach(getDayItem);
    };

    const renderAllEvents = (sortedEvents) => {
      const day = new DayItemComponent(null);

      render(dayList, day);

      const tripEventsList = day.getElement().querySelector(`.trip-events__list`);

      sortedEvents.map((event) => renderEvent(tripEventsList, event));
    };

    renderEventsByDays(events);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedEvents = getSortedEvents(events, sortType);

      dayList.innerHTML = ``;

      if (sortType === SortType.EVENT) {
        renderEventsByDays(sortedEvents);
      } else {
        renderAllEvents(sortedEvents);
      }
    });
  }
}
