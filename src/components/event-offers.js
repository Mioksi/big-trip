const createOfferMarkup = (offer) => {
  const {name, price} = offer;

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const createOffers = (offers) => offers.map((createOfferMarkup)).join(``);

export {createOffers};
