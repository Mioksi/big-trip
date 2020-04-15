import {generateOffer} from '../../mock/offer';

const offers = generateOffer();

const getCheckedFilter = (isChecked) => isChecked ? `checked` : ``;

const createOffer = (offer) => {
  const {type, name, price, isChecked} = offer;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
        id="event-offer-luggage-1"
        type="checkbox"
        name="event-offer-${type}"
        ${getCheckedFilter(isChecked)}
       >
      <label class="event__offer-label" for="event-offer-${type}-1">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOffers = () => {
  return offers.map((createOffer)).join(``);
};

export {createOffers};
