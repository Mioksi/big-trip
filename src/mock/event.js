import {getBoolean, shuffleArray, getRandomNumber, getNewDate, getRandomDate} from '../common/utils/helpers';
import {Price, Description, Photos, MAX_OFFERS, DESCRIPTIONS, EVENT_TYPES, DESTINATIONS} from '../common/consts';
import {eventOffers} from './offer';

const eventPlaceholder = {
  'taxi': `Taxi to `,
  'bus': `Bus to `,
  'train': `Train to `,
  'ship': `Ship to `,
  'transport': `Transport to `,
  'drive': `Drive to `,
  'flight': `Flight to `,
  'check-in': `Check-in in `,
  'sightseeing': `Sightseeing in `,
  'restaurant': `Restaurant in `
};

const getPhotoLink = () => `http://picsum.photos/248/152?r=${Math.random()}`;

const getPhotos = () => {
  const photosAmount = getRandomNumber(Photos.MAX, Photos.MIN);

  return new Array(photosAmount).fill(``).map(getPhotoLink);
};

const generateOffers = () => eventOffers.filter(() => getBoolean()).slice(0, MAX_OFFERS);

const getDescriptions = () => {
  return shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(Description.MAX, Description.MIN)).join(` `);
};

const generateTripEvent = () => {
  const startTime = getNewDate();
  const endTime = getRandomDate(startTime, new Date(2020, 4, 1));

  return {
    type: EVENT_TYPES[getRandomNumber(EVENT_TYPES.length)],
    startTime,
    endTime,
    city: DESTINATIONS[getRandomNumber(DESTINATIONS.length)],
    description: getDescriptions(),
    price: getRandomNumber(Price.MIN, Price.MAX),
    photos: getPhotos(),
    offers: generateOffers()
  };
};

const generateTripEvents = (count) => new Array(count).fill(``).map(generateTripEvent);

export {eventPlaceholder, generateTripEvents};
