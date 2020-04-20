import {renderDay} from './render-day';
import {renderEvent} from '../../event/utils/render-event';

const renderDays = (container, allDays, events) => {
  allDays.map((day, index) => renderDay(container, day, index));

  const days = container.querySelectorAll(`.day`);

  days.forEach((day) => {
    const dayDate = day.querySelector(`.day__date`);
    const dateTime = new Date(dayDate.dateTime);

    const eventList = day.querySelector(`.trip-events__list`);

    for (let event of events) {
      if (event.startTime.getDate() === dateTime.getDate()) {
        renderEvent(eventList, event);
      }
    }
  });
};

export {renderDays};
