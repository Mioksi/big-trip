import {DifferenceFormat} from '../../../../common/consts';
import {formatTime, formatDate, getIsoDate, castTimeFormat} from '../../../../common/utils/helpers';
import {eventPlaceholder} from '../../../../common/consts';
import moment from "moment";

const calculateTimeDifference = (start, end) => {
  const startTime = moment(start);
  const endTime = moment(end);

  const differenceDays = endTime.diff(startTime, `days`);
  startTime.add(differenceDays, `days`);

  const differenceHours = endTime.diff(startTime, `hours`);
  startTime.add(differenceHours, `hours`);

  const differenceMinutes = endTime.diff(startTime, `minutes`);
  const minutes = castTimeFormat(differenceMinutes) + DifferenceFormat.MINUTE;

  let days = ``;
  let hours = ``;

  if (differenceDays > 0) {
    days = differenceDays > 0 ? castTimeFormat(differenceDays) + DifferenceFormat.DAY : ``;
    hours = castTimeFormat(differenceHours) + DifferenceFormat.HOUR;
  } else if (differenceHours > 0) {
    hours = castTimeFormat(differenceHours) + DifferenceFormat.HOUR;
  }

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
