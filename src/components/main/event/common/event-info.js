import {TimeMS} from '../../../../common/consts';
import {formatTime, formatDate, getIsoDate} from '../../../../common/utils/helpers';
import {eventPlaceholder} from '../../../../mock/event';

const calculateTimeDifference = (startTime, endTime) => {
  const difference = endTime.getTime() - startTime.getTime();
  const differenceDays = Math.floor(difference / TimeMS.IN_DAY);
  const differenceHours = Math.floor((difference % TimeMS.IN_DAY) / TimeMS.IN_HOUR);
  const differenceMinutes = Math.floor(((difference % TimeMS.IN_DAY) % TimeMS.IN_HOUR) / TimeMS.IN_MINUTE);

  const minutes = differenceMinutes > 0 ? `${differenceMinutes}M` : ``;
  let days = ``;
  let hours = ``;

  if (differenceDays > 0) {
    days = differenceDays < 10 ? `0${differenceDays}D` : `${differenceDays}D`;
    hours = differenceHours < 10 ? `0${differenceHours}H` : `${differenceHours}H`;
  } else {
    if (differenceHours > 0) {
      hours = differenceHours < 10 ? `0${differenceHours}H` : `${differenceHours}H`;
    }
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

  return [start, end, startFullDate, endFullDate, eventType, startIsoDate, endIsoDate, timeDifference];
};

export {getEventInfo};
