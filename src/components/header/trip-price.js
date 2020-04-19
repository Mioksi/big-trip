const calculateOffersPrice = (offers) => {
  return offers ? offers.reduce((total, offer) => total + offer.price, 0) : 0;
};

const calculateEventsPrice = (events) => {
  return events.reduce((total, event) => total + event.price + calculateOffersPrice(event.offers), 0);
};

const createTripPrice = (events) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateEventsPrice(events)}</span>
  </p>`
);

export {createTripPrice};
