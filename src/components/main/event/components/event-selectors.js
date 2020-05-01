import {getBoolean} from '../../../../common/utils/helpers';

const getCheckedFilter = () => getBoolean() ? `checked` : ``;

const createOffer = (offer) => {
  const {type, name, price} = offer;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
        id="event-offer-${type}-1"
        type="checkbox"
        name="event-offer-${type}-1"
        ${getCheckedFilter()}
       >
      <label class="event__offer-label" for="event-offer-${type}-1">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

export {createOffer};
