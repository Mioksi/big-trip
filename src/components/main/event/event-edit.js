import {EVENT_TYPES_TO, EVENT_TYPES_IN, DESTINATIONS, DATE_FORMAT, Mode, ButtonText} from '../../../common/consts';
import {getEventInfo} from './common/event-info';
import {createTransferItems, createActivityItems} from './components/event-types';
import {createOptions} from './components/event-options';
import {createAdditionalButtons} from './components/additional-buttons';
import {createEventDetails} from './components/event-details';
import AbstractSmartComponent from '../../abstracts/abstract-smart-component';
import {destinations, eventPlaceholder} from '../../../mock/event';
import {generateOffersByType} from '../../../mock/offer';
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const createEventEdit = (event, mode, options = {}) => {
  const {price, isFavorite} = event;
  const {type, offers, destination} = options;
  const {city, description, photos} = destination;
  const {start, end, startFullDate, endFullDate} = getEventInfo(event);

  const eventType = eventPlaceholder[type];
  const textButton = (mode === Mode.ADDING ? ButtonText.cancel : ButtonText.delete);
  const additionalButtons = mode === Mode.ADDING ? `` : createAdditionalButtons(isFavorite);
  const getEventDetails = (type && city) ? createEventDetails(offers, description, photos) : ``;

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
        <button class="event__reset-btn" type="reset">${textButton}</button>
        ${additionalButtons}
      </header>
      ${getEventDetails}
    </form>`
  );
};

const parseFormData = (formData) => {
  const startTime = formData.get(`event-start-time`);
  const endTime = formData.get(`event-end-time`);
  const description = document.querySelector(`.event__destination-description`).textContent;
  let photos = [...document.querySelectorAll(`.event__photo`)];
  let offers = [...document.querySelectorAll(`.event__offer-selector`)];

  photos = photos.map((photo) => photo.src);
  offers = offers.map((offer) => {
    return {
      name: offer.querySelector(`.event__offer-title`).textContent,
      price: offer.querySelector(`.event__offer-price`).textContent
    };
  });

  return {
    type: formData.get(`event-type`),
    destination: {
      city: formData.get(`event-destination`),
      description,
      photos
    },
    startTime: startTime ? new Date(startTime) : null,
    endTime: endTime ? new Date(endTime) : null,
    offers,
    price: formData.get(`event-price`),
  };
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(event, mode) {
    super();

    this._event = event;
    this._eventType = this._event.type;
    this._eventOffers = this._event.offers;
    this._eventDestination = this._event.destination;

    this._mode = mode;

    this._submitHandler = null;
    this._deleteButtonClickHandler = null;
    this._favoriteButtonHandler = null;
    this._rollupButtonHandler = null;
    this._flatpickr = null;

    this._onEventTypeChange = this._onEventTypeChange.bind(this);
    this._onDestinationChange = this._onDestinationChange.bind(this);

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEdit(this._event, this._mode, {
      type: this._eventType,
      offers: this._eventOffers,
      destination: this._eventDestination
    });
  }

  removeElement() {
    if (this._flatpickr) {
      this._destroyFlatpickr();
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setFavoriteButtonHandler(this._favoriteButtonHandler);
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setRollupButtonHandler(this._rollupButtonHandler);
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

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._deleteButtonClickHandler = handler;
  }

  setFavoriteButtonHandler(handler) {
    const favoriteButton = this.getElement().querySelector(`.event__favorite-btn`);

    if (favoriteButton) {
      favoriteButton.addEventListener(`click`, handler);
    }

    this._favoriteButtonHandler = handler;
  }

  setRollupButtonHandler(handler) {
    const rollupButton = this.getElement().querySelector(`.event__rollup-btn`);

    if (rollupButton) {
      rollupButton.addEventListener(`click`, handler);
    }

    this._rollupButtonHandler = handler;
  }

  _onEventTypeChange(evt) {
    this._eventType = evt.target.value;
    this._eventOffers = generateOffersByType(this._eventType);

    this.rerender();
  }

  _setFlatpickr(date) {
    return {
      'altInput': true,
      'enableTime': true,
      'dateFormat': `Z`,
      'altFormat': DATE_FORMAT,
      'time_24hr': true,
      'defaultDate': date || ``,
    };
  }

  _getFlatpickrConfig(timeInput, date) {
    this._flatpickr = flatpickr(timeInput, this._setFlatpickr(date));
  }

  _destroyFlatpickr() {
    this._flatpickr.destroy();
    this._flatpickr = null;
  }

  _applyFlatpickr() {
    const startTimeInput = this.getElement().querySelector(`#event-start-time-1`);
    const endTimeInput = this.getElement().querySelector(`#event-end-time-1`);

    if (this._flatpickr) {
      this._destroyFlatpickr();
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
