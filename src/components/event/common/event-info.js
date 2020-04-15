import {formatTime, getIsoDate} from '../../../common/utils';
import {eventPlaceholder} from '../../../mock/event';

const getEventTime = (time) => formatTime(time);

const getEventInfo = (event) => {
  const {type, startTime, endTime} = event;

  const eventType = eventPlaceholder[type];
  const start = getEventTime(startTime);
  const end = getEventTime(endTime);
  const startDate = getIsoDate(startTime);
  const endDate = getIsoDate(endTime);

  return [eventType, start, end, startDate, endDate];
};

export {getEventInfo};
