import {Place, Sign, MAX_HOURS_RANGE, HOURS_FORMAT, MAX_DAYS, MAX_HOURS, MAX_MINUTES} from './consts';

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

export const render = (container, template, place = Place.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

const castTimeFormat = (value) => {
  return value < MAX_HOURS_RANGE ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % HOURS_FORMAT);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const formatDate = (date) => {
  const day = castTimeFormat(date.getDate());
  const month = castTimeFormat(date.getMonth() + 1);
  const year = castTimeFormat(date.getFullYear());

  return `${day}/${month}/${year.substr(-2)}`;
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getBoolean() ? Sign.POSITIVE : Sign.NEGATIVE;
  const diffValue = sign * getRandomNumber(MAX_DAYS);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + getRandomNumber(MAX_HOURS));
  targetDate.setMinutes(targetDate.getMinutes() + getRandomNumber(MAX_MINUTES));

  return targetDate;
};

export const getFullDate = (date) => {
  return formatDate(date);
};
