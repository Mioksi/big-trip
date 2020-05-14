import {TimeMS, DifferenceFormat} from '../../../../common/consts';
import {formatTime, formatDate, getIsoDate} from '../../../../common/utils/helpers';
import {eventPlaceholder} from '../../../../common/consts';
import moment from "moment";

const calculateTimeDifference = (start, end) => {
  const startTime = moment(start);
  const endTime = moment(end);
  const difference = endTime.diff(startTime);

  const days = (difference > TimeMS.IN_DAY) ? endTime.diff(startTime, `days`) + DifferenceFormat.DAY : ``;
  const hours = (difference > TimeMS.IN_HOUR) ? moment(difference).format(`HH`) + DifferenceFormat.HOUR : ``;
  const minutes = moment(difference).format(`mm`) + DifferenceFormat.MINUTE;

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

  return {start, end, startFullDate, endFullDate, eventType, startIsoDate, endIsoDate, timeDifference};
};

export {getEventInfo};
