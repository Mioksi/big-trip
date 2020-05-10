export const EVENTS_AMOUNT = 20;
export const MAX_HOURS = 23;
export const MAX_MINUTES = 59;
export const MAX_DAYS = 14;
export const MAX_OFFERS = 5;
export const MAX_DESTINATIONS = 3;
export const BAR_HEIGHT = 55;
const MILLISECOND = 1000;
const SECONDS_IN_HOUR = 3600;
const HOURS_IN_DAY = 24;

export const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];
export const EVENT_TYPES_TO = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const EVENT_TYPES_IN = [`check-in`, `sightseeing`, `restaurant`];
export const EVENT_TYPES = [...EVENT_TYPES_TO, ...EVENT_TYPES_IN];
export const DESTINATIONS = [`Amsterdam`, `Chamonix`, `Geneva`, `Moscow`, `Saint Petersburg`, `Canberra`];
export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

export const FILTER_ID_PREFIX = `filter-`;
export const HIDDEN_CLASS = `visually-hidden`;

export const ESC_KEY = `Escape`;

export const emptyPoint = {
  id: ``,
  type: `taxi`,
  destination: {
    city: ``
  },
  startTime: new Date(),
  endTime: new Date(),
  offers: [],
  price: 0,
  isFavorite: false,
};

export const Place = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`
};

export const Sign = {
  NEGATIVE: -1,
  POSITIVE: 1
};

export const Price = {
  MIN: 1,
  MAX: 1000
};

export const Description = {
  MIN: 1,
  MAX: 5
};

export const Photos = {
  MIN: 1,
  MAX: 5
};

export const SortType = {
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`
};

export const TimeMS = {
  IN_HOUR: SECONDS_IN_HOUR * MILLISECOND,
  IN_DAY: HOURS_IN_DAY * SECONDS_IN_HOUR * MILLISECOND
};

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const DifferenceFormat = {
  DAY: `D`,
  HOUR: `H`,
  MINUTE: `M`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const ButtonText = {
  CANCEL: `Cancel`,
  DELETE: `Delete`,
};

export const FormatDate = {
  DEFAULT: `d/m/y H:i`,
  ISO: `Z`
};

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
};

export const iconMap = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🚢`,
  'transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈️`,
  'check-in': `🏨`,
  'sightseeing': `🏛️`,
  'restaurant': `🍽️`
};
