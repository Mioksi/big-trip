import {getBoolean, getRandomNumber, getRandomDate} from '../common/utils';
import {Price, Photos, MAX_OFFERS, MAX_DESCRIPTIONS} from '../common/consts';

const EVENT_TYPES = [
  `Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`
];

const DESTINATIONS = [`Amsterdam`, `Chamonix`, `Geneva`, `Moscow`, `Saint Petersburg`, `Canberra`];

const eventOffers = [
  {
    type: `luggage`,
    name: `Add luggage`,
    price: 30
  },
  {
    type: `comfort`,
    name: `Switch to comfort class`,
    price: 100
  },
  {
    type: `meal`,
    name: `Add meal`,
    price: 15
  },
  {
    type: `seats`,
    name: `Choose seats`,
    price: 5
  },
  {
    type: `train`,
    name: `Travel by train`,
    price: 40
  }
];

const eventPlaceholder = {
  'Taxi': `Taxi to `,
  'Bus': `Bus to `,
  'Train': `Train to `,
  'Ship': `Ship to `,
  'Transport': `Transport to `,
  'Drive': `Drive to `,
  'Flight': `Flight to `,
  'Check-in': `Check-in in `,
  'Sightseeing': `Sightseeing in `,
  'Restaurant': `Restaurant in `
};

const DESCRIPTIONS = [
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

const getPhotoLink = () => `http://picsum.photos/248/152?r=${Math.random()}`;

const getPhotos = () => {
  const photosAmount = getRandomNumber(Photos.MAX, Photos.MIN);

  return new Array(photosAmount).fill(``).map(getPhotoLink);
};

const generateOffers = () => eventOffers.filter(() => getBoolean()).slice(0, MAX_OFFERS);

const getDescriptions = () => DESCRIPTIONS.filter(() => getBoolean()).slice(0, MAX_DESCRIPTIONS).join(` `);

const generateTripEvent = () => {
  return {
    type: EVENT_TYPES[getRandomNumber(EVENT_TYPES.length)],
    startTime: getRandomDate(),
    endTime: getRandomDate(),
    city: DESTINATIONS[getRandomNumber(DESTINATIONS.length)],
    description: getDescriptions(),
    price: getRandomNumber(Price.MIN, Price.MAX),
    photos: getPhotos(),
    offers: generateOffers()
  };
};

const generateTripEvents = (count) => new Array(count).fill(``).map(generateTripEvent);

export {eventPlaceholder, generateTripEvents};
