import {getBoolean} from '../common/utils';

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

const generateOffer = () => eventOffers.map((offer) => {
  const {type, name, price} = offer;

  return {
    type,
    name,
    price,
    isChecked: getBoolean()
  };
});

export {generateOffer, eventOffers};
