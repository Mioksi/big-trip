export const MAX_DESTINATIONS = 3;
export const MAX_OFFERS = 3;
export const BAR_HEIGHT = 55;
export const MAX_HOURS = 10;
export const SHAKE_ANIMATION_TIMEOUT = 600;

export const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];
export const EVENT_TYPES_TO = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const EVENT_TYPES_IN = [`check-in`, `sightseeing`, `restaurant`];

export const AUTHORIZATION = `Basic beaAeswIKoYSdx434d5`;
export const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v1`;
export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

export const FILTER_ID_PREFIX = `filter-`;
export const HIDDEN_CLASS = `visually-hidden`;

export const ESC_KEY = `Escape`;

export const eventPlaceholder = {
  'taxi': `Taxi to `,
  'bus': `Bus to `,
  'train': `Train to `,
  'ship': `Ship to `,
  'transport': `Transport to `,
  'drive': `Drive to `,
  'flight': `Flight to `,
  'check-in': `Check-in in `,
  'sightseeing': `Sightseeing in `,
  'restaurant': `Restaurant in `,
};

export const emptyPoint = {
  id: ``,
  type: `taxi`,
  destination: {
    name: ``
  },
  startTime: new Date(),
  endTime: new Date(),
  offers: [],
  price: 0,
  isFavorite: false,
};

export const iconMap = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🛳`,
  'transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈️`,
  'check-in': `🏨`,
  'sightseeing': `🏛️`,
  'restaurant': `🍴`,
};

export const buttonText = {
  cancelButtonText: `Cancel`,
  deleteButtonText: `Delete`,
  saveButtonText: `Save`
};

export const Place = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
};

export const SortType = {
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const DifferenceFormat = {
  DAY: `D`,
  HOUR: `H`,
  MINUTE: `M`,
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const FormatDate = {
  DEFAULT: `d/m/y H:i`,
  ISO: `Z`,
  MOMENT_TIME: `HH:mm`,
  MOMENT_DATE: `DD/MM/YY`,
  MOMENT_ISO: `YYYY-MM-DDTHH:mm`,
};

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

export const StatusCode = {
  SUCCESS: 200,
  REDIRECT: 300,
};

export const Url = {
  DESTINATIONS: `destinations`,
  OFFERS: `offers`,
  POINTS: `points`,
};
