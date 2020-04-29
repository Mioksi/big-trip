const eventOffers = {
  'check-in': [
    {
      type: `luggage`,
      name: `Add luggage`,
      price: 30
    }
  ],
  'flight': [
    {
      type: `comfort`,
      name: `Switch to comfort class`,
      price: 100
    }
  ],
  'restaurant': [
    {
      type: `meal`,
      name: `Add meal`,
      price: 15
    }
  ],
  'ship': [
    {
      type: `seats`,
      name: `Choose seats`,
      price: 5
    }
  ],
  'train': [
    {
      type: `train`,
      name: `Travel by train`,
      price: 40
    }
  ],
  'taxi': [
    {
      type: `uber`,
      name: `Order Uber`,
      price: 20
    }
  ],
  'drive': [
    {
      type: `car`,
      name: `Rent a car`,
      price: 200
    }
  ],
  'transport': [
    {
      type: `breakfast`,
      name: `Add breakfast`,
      price: 50
    }
  ],
  'sightseeing': [
    {
      type: `tickets`,
      name: `Book tickets`,
      price: 40
    }
  ],
  'bus': [
    {
      type: `lunch`,
      name: `Lunch in city`,
      price: 30
    }
  ]
};

const generateOffersByType = (type) => eventOffers[type].map((offer) => Object.assign({}, offer));

export {eventOffers, generateOffersByType};
