import {EVENT_TYPES_TO, EVENT_TYPES_IN, DESTINATIONS} from '../../../common/consts';
import {getEventInfo} from './common/event-info';
import {createTransferItems, createActivityItems} from './components/event-types';
import {createOptions} from './components/event-options';
import {createOffer} from './components/event-selectors';
import {createPhotos} from './components/event-photos';
import AbstractSmartComponent from '../../abstracts/abstract-smart-component';
import {destinations} from '../../../mock/event';
import {generateOffersByType} from '../../../mock/offer';
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const getCheckedInput = (value) => value ? `checked` : ``;

const createEventEdit = (event, options = {}) => {
  const {price, isFavorite} = event;
  const {type, offers, destination} = options;
  const {city, description, photos} = destination;
  const [start, end, startFullDate, endFullDate, eventType] = getEventInfo(event);

  const createOffers = () => {
    return offers.map(createOffer).join(``);
  };

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-${type}-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-${type}-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${createTransferItems(EVENT_TYPES_TO, type)}
            </fieldset>
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${createActivityItems(EVENT_TYPES_IN, type)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventType}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1"
            type="text"
            name="event-destination"
            value="${city}"
            list="destination-list-1"
          >
          <datalist id="destination-list-1">
            ${createOptions(DESTINATIONS)}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${startFullDate} ${start}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${endFullDate} ${end}"
          >
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1"
            type="text"
            name="event-price"
            value="${price}"
          >
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${getCheckedInput(isFavorite)}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
         </label>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${createOffers()}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${createPhotos(photos)}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;
    this._eventType = this._event.type;
    this._eventOffers = this._event.offers;
    this._eventDestination = this._event.destination;

    this._submitHandler = null;
    this._favoriteButtonHandler = null;
    this._flatpickr = null;

    this._onEventTypeChange = this._onEventTypeChange.bind(this);
    this._onDestinationChange = this._onDestinationChange.bind(this);

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEdit(this._event, {
      type: this._eventType,
      offers: this._eventOffers,
      destination: this._eventDestination
    });
  }

  recoveryListeners() {
    this.setFavoriteButtonHandler(this._favoriteButtonHandler);
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const event = this._event;

    this._eventType = event.type;
    this._eventOffers = event.offers;
    this._eventDestination = event.destination;

    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoriteButtonHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoriteButtonHandler = handler;
  }

  _onEventTypeChange(evt) {
    this._eventType = evt.target.value;
    this._eventOffers = generateOffersByType(this._eventType);

    this.rerender();
  }

  _getFlatpickrConfig(timeInput, date) {
    this._flatpickr = flatpickr(timeInput, {
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      defaultDate: date || ``,
    });
  }

  _applyFlatpickr() {
    const startTimeInput = this.getElement().querySelector(`#event-start-time-1`);
    const endTimeInput = this.getElement().querySelector(`#event-end-time-1`);

    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    this._getFlatpickrConfig(startTimeInput, this._event.startTime);
    this._getFlatpickrConfig(endTimeInput, this._event.endTime);
  }

  _onDestinationChange(evt) {
    evt.preventDefault();

    const currentCity = evt.target.value;
    const index = destinations.map((destination) => destination.city).indexOf(currentCity);

    if (index === -1) {
      return;
    }

    this._eventDestination = destinations[index];

    this.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const eventTypeList = element.querySelector(`.event__type-list`);
    const eventDestination = element.querySelector(`.event__input--destination`);

    eventTypeList.addEventListener(`change`, this._onEventTypeChange);
    eventDestination.addEventListener(`change`, this._onDestinationChange);
  }
}
