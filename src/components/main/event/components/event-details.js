import {createOfferSelectors} from './event-offer-selectors';
import {createPhotos} from './event-photos';


const createEventOffers = (offers, offerTitles) => {
  return (
    `<section class="event__section  event__section--offers">
       <h3 class="event__section-title  event__section-title--offers">Offers</h3>
       <div class="event__available-offers">
         ${createOfferSelectors(offers, offerTitles)}
       </div>
     </section>`
  );
};

const createEventDetails = (offers, offerTitles, description, photos) => {
  const eventOffersTemplate = offers.length ? createEventOffers(offers, offerTitles) : ``;

  return (
    `<section class="event__details">
      <section class="event__section  event__section--offers">
        ${eventOffersTemplate}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${createPhotos(photos)}
          </div>
        </div>
      </section>
    </section>`
  );
};

export {createEventDetails};
