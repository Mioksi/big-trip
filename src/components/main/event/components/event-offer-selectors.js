const getCheckedOffer = (isChecked) => isChecked ? `checked` : ``;

const createOfferSelector = (offer, offerTitle, index) => {
  const {title, price} = offer;
  const name = title.replace(/ /g, `-`).toLowerCase();
  const isChecked = offerTitle.some((itemTitle) => itemTitle === offer.title);

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
        id="event-offer-${name}-${index}"
        type="checkbox"
        name="event-offer"
        value="${title}"
        ${getCheckedOffer(isChecked)}
       >
      <label class="event__offer-label" for="event-offer-${name}-${index}">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOfferSelectors = (offers, offerTitles) => {
  return offers.map((offer, index) => createOfferSelector(offer, offerTitles, index + 1)).join(``);
};

export {createOfferSelectors};
