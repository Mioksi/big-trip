import {MAX_OFFERS} from '../../../../common/consts';

const createOfferMarkup = (offer) => {
  const {title, price} = offer;

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const createOffers = (offers) => offers.slice(0, MAX_OFFERS).map((createOfferMarkup)).join(``);

export {createOffers};
