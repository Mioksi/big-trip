import {isEscEvent} from '../common/utils/helpers';
import {render, replace} from '../common/utils/render';
import EventItemComponent from '../components/main/event/event-item';
import EventEditComponent from '../components/main/event/event-edit';
import DayItemComponent from '../components/main/day/day-item';

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

export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render(events, allDays) {
    const container = this._container.getElement();

    allDays.map((day, index) => renderDay(container, day, index));

    const days = container.querySelectorAll(`.day`);

    const getDayItem = (day) => {
      const dayDate = day.querySelector(`.day__date`);
      const dateTime = new Date(dayDate.dateTime);

      const eventList = day.querySelector(`.trip-events__list`);

      for (let event of events) {
        if (event.startTime.getDate() === dateTime.getDate()) {
          renderEvent(eventList, event);
        }
      }
    };

    days.forEach(getDayItem);
  }
}
