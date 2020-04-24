import {TimeMS} from '../../../../common/consts';
import {formatTime, getIsoDate} from '../../../../common/utils/helpers';
import {eventPlaceholder} from '../../../../mock/event';

const getEventTime = (time) => formatTime(time);

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
  const start = getEventTime(startTime);
  const end = getEventTime(endTime);
  const startDate = getIsoDate(startTime);
  const endDate = getIsoDate(endTime);
  const timeDifference = calculateTimeDifference(startTime, endTime);

  return [eventType, start, end, startDate, endDate, timeDifference];
};

export {getEventInfo};
