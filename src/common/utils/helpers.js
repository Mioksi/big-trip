import {Sign, MAX_DAYS, MAX_HOURS, MAX_MINUTES} from '../consts';
import moment from "moment";

export const getRandomNumber = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getBoolean = () => Math.random() > 0.5;

export const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[j];

    array[j] = array[i];
    array[i] = temp;
  }

  return array;
};

export const formatTime = (date) => moment(date).format(`HH:mm`);
export const formatDate = (date) => moment(date).format(`DD/MM/YY`);
export const getIsoDate = (date) => moment(date).format(`YYYY-MM-DDTHH:mm`);

export const getNewDate = () => {
  const targetDate = new Date();
  const sign = getBoolean() ? Sign.POSITIVE : Sign.NEGATIVE;
  const diffValue = sign * getRandomNumber(MAX_DAYS);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + getRandomNumber(MAX_HOURS));
  targetDate.setMinutes(targetDate.getMinutes() + getRandomNumber(MAX_MINUTES));

  return targetDate;
};

export const getRandomDate = (startDate, endDate) => {
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};

const getDefaultSortedEvent = (first, second) => first.startTime - second.startTime;

export const getDefaultSortedEvents = (events) => events.sort(getDefaultSortedEvent);
