import {getBoolean, shuffleArray, getRandomNumber, getNewDate, getRandomDate} from '../common/utils/helpers';
import {Price, Description, Photos, DESCRIPTIONS, EVENT_TYPES, DESTINATIONS, MAX_OFFERS} from '../common/consts';
import {generateOffersByType} from './offer';

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

const getDescriptions = () => {
  return shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(Description.MAX, Description.MIN)).join(` `);
};

const generateDestinations = () => DESTINATIONS.map((city) => {
  return {
    city,
    description: getDescriptions(),
    photos: getPhotos()
  };
});

const destinations = generateDestinations();

const generateTripEvent = () => {
  const type = EVENT_TYPES[getRandomNumber(EVENT_TYPES.length)];

  const startTime = getNewDate();
  const endTime = getRandomDate(startTime, new Date(2020, 4, 1));

  const currentOffers = generateOffersByType(type);
  const generateOffers = () => currentOffers.filter(() => getBoolean()).slice(0, MAX_OFFERS);

  return {
    type,
    startTime,
    endTime,
    destination: destinations[getRandomNumber(DESTINATIONS.length)],
    price: getRandomNumber(Price.MIN, Price.MAX),
    offers: generateOffers(),
    isFavorite: getBoolean()
  };
};

const generateTripEvents = (count) => new Array(count).fill(``).map(generateTripEvent);

export {eventPlaceholder, generateTripEvents, destinations};
