import {Place, Sign, MAX_HOURS_RANGE, HOURS_FORMAT, MAX_DAYS, MAX_HOURS, MAX_MINUTES, TIME_OFFSET} from './consts';

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

const castTimeFormat = (value) => value < MAX_HOURS_RANGE ? `0${value}` : String(value);

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

export const getFullDate = (date) => formatDate(date);

export const getIsoDate = (date) => {
  const offset = date.getTimezoneOffset() * TIME_OFFSET;
  const targetDate = new Date(date - offset);

  return targetDate.toISOString();
};

export const render = (container, element, place = Place.BEFOREEND) => {
  switch (place) {
    case Place.BEFOREEND:
      container.append(element);
      break;
    case Place.AFTERBEGIN:
      container.prepend(element);
      break;
    case Place.AFTEREND:
      container.after(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
