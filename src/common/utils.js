import {Place, Sign, MAX_HOURS_RANGE, HOURS_FORMAT, MAX_DAYS, MAX_HOURS, MAX_MINUTES} from './consts';

export const getRandomNumber = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getBoolean = () => Math.random() > 0.5;

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

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getBoolean() ? Sign.POSITIVE : Sign.NEGATIVE;
  const diffValue = sign * getRandomNumber(MAX_DAYS);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + getRandomNumber(MAX_HOURS));
  targetDate.setMinutes(targetDate.getMinutes() + getRandomNumber(MAX_MINUTES));

  return targetDate;
};
