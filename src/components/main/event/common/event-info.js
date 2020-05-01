import {TimeMS} from '../../../../common/consts';
import {formatTime, formatDate, getIsoDate} from '../../../../common/utils/helpers';
import {eventPlaceholder} from '../../../../mock/event';
import moment from "moment";

const calculateTimeDifference = (start, end) => {
  const startTime = moment(start);
  const endTime = moment(end);
  const difference = endTime.diff(startTime);

  const days = (difference > TimeMS.IN_DAY) ? endTime.diff(startTime, `days`) + `D` : ``;
  const hours = (difference > TimeMS.IN_HOUR) ? moment(difference).format(`HH`) + `H` : ``;
  const minutes = moment(difference).format(`mm`) + `M`;

  return `${days} ${hours} ${minutes}`;
};

const getEventInfo = (event) => {
  const {type, startTime, endTime} = event;

  const eventType = eventPlaceholder[type];
  const start = formatTime(startTime);
  const end = formatTime(endTime);
  const startFullDate = formatDate(startTime);
  const endFullDate = formatDate(endTime);
  const startIsoDate = getIsoDate(startTime);
  const endIsoDate = getIsoDate(endTime);
  const timeDifference = calculateTimeDifference(startTime, endTime);

  return [start, end, startFullDate, endFullDate, eventType, startIsoDate, endIsoDate, timeDifference];
};

export {getEventInfo};
