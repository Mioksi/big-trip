import {getBoolean, shuffleArray, getRandomNumber, getRandomDate} from '../common/utils';
import {Price, Description, Photos, MAX_OFFERS} from '../common/consts';

const EVENT_TYPES_TO = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
const EVENT_TYPES_IN = [`check-in`, `sightseeing`, `restaurant`];

const EVENT_TYPES = [...EVENT_TYPES_IN, ...EVENT_TYPES_TO];

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

const getDescriptions = () => shuffleArray(DESCRIPTIONS).slice(0, getRandomNumber(Description.MAX, Description.MIN)).join(` `);

const generateOffer = () => eventOffers.map((offer) => {
  const {type, name, price} = offer;

  return {
    type,
    name,
    price,
    isChecked: getBoolean()
  };
});

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

export {EVENT_TYPES_TO, EVENT_TYPES_IN, DESTINATIONS, eventPlaceholder, generateTripEvents, generateOffer};
