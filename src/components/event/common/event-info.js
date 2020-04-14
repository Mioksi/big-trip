import {formatTime} from '../../../common/utils';
import {MAX_DATE_SYMBOLS, TIME_OFFSET} from '../../../common/consts';
import {eventPlaceholder} from '../../../mock/event';

const getEventTime = (time) => formatTime(time);

const getEventDate = (date) => {
  const offset = date.getTimezoneOffset() * TIME_OFFSET;
  const targetDate = new Date(date - offset);

  return targetDate.toISOString().substr(0, MAX_DATE_SYMBOLS);
};

const getEventInfo = (event) => {
  const {type, startTime, endTime} = event;

  const eventType = eventPlaceholder[type];
  const start = getEventTime(startTime);
  const end = getEventTime(endTime);
  const startDate = getEventDate(startTime);
  const endDate = getEventDate(endTime);

  return [eventType, start, end, startDate, endDate];
};

export {getEventInfo};
