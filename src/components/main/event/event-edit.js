import {EVENT_TYPES_TO, EVENT_TYPES_IN, FormatDate, Mode, buttonText, eventPlaceholder} from '../../../common/consts';
import {getOffersByType} from '../../../common/utils/helpers';
import {getEventInfo} from './common/event-info';
import {createTransferItems, createActivityItems} from './components/event-types';
import {createOptions} from './components/event-options';
import {createAdditionalButtons} from './components/additional-buttons';
import {createEventDetails} from './components/event-details';
import AbstractSmartComponent from '../../abstracts/abstract-smart-component';
import flatpickr from "flatpickr";
import {encode} from "he";

import "flatpickr/dist/flatpickr.min.css";

const createEventEdit = (event, mode, options = {}) => {
  const {
    type,
    offers,
    price: notSanitizedPrice,
    destination,
    allDestinations,
    offersByType,
    isFavorite,
    externalData
  } = options;
  const {name: notSanitizedCity, description, pictures} = destination;
  const {start, end, startFullDate, endFullDate} = getEventInfo(event);

  const name = encode(notSanitizedCity);
  const price = encode(notSanitizedPrice.toString());

  const deleteButtonText = externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;

  const offerTitles = offers.map((offer) => offer.title);

  const eventType = eventPlaceholder[type];
  const textButton = (mode === Mode.ADDING ? buttonText.cancelButtonText : deleteButtonText);
  const additionalButtons = mode === Mode.ADDING ? `` : createAdditionalButtons(isFavorite);
  const getEventDetails = (type && name) ? createEventDetails(offersByType, offerTitles, description, pictures) : ``;

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
            value="${name}"
            list="destination-list-1"
            required
          >
          <datalist id="destination-list-1">
            ${createOptions(allDestinations)}
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
        <button class="event__save-btn  btn  btn--blue" type="submit">${saveButtonText}</button>
        <button class="event__reset-btn" type="reset">${textButton}</button>
        ${additionalButtons}
      </header>
      ${getEventDetails}
    </form>`
  );
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(event, mode, offers, destinations) {
    super();

    this._event = event;
    this._eventType = this._event.type;
    this._eventOffers = this._event.offers;
    this._eventDestination = this._event.destination;
    this._startDate = this._event.startTime;
    this._endDate = this._event.endTime;
    this._eventPrice = this._event.price;
    this._isFavorite = this._event.isFavorite;
    this._externalData = buttonText;

    this._allOffers = offers;
    this._allDestinations = destinations;
    this._offersByType = getOffersByType(this._allOffers, this._eventType);

    this._mode = mode;

    this._submitHandler = null;
    this._deleteButtonClickHandler = null;
    this._favoriteButtonHandler = null;
    this._rollupButtonHandler = null;
    this._flatpickrStartTime = null;
    this._flatpickrEndTime = null;

    this._onEventTypeChange = this._onEventTypeChange.bind(this);
    this._onDestinationChange = this._onDestinationChange.bind(this);
    this._onStartDateChange = this._onStartDateChange.bind(this);
    this._onEndDateChange = this._onEndDateChange.bind(this);
    this._onPriceChange = this._onPriceChange.bind(this);
    this._onOffersChange = this._onOffersChange.bind(this);
    this._onFavoriteButtonClick = this._onFavoriteButtonClick.bind(this);

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEdit(this._event, this._mode, {
      type: this._eventType,
      offers: this._eventOffers,
      offersByType: this._offersByType,
      destination: this._eventDestination,
      allDestinations: this._allDestinations,
      price: this._eventPrice,
      isFavorite: this._isFavorite,
      externalData: this._externalData,
    });
  }

  removeElement() {
    this.destroyFlatpickr();

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

    this.applyFlatpickr();
  }

  reset() {
    const event = this._event;

    this._eventType = event.type;
    this._eventOffers = event.offers;
    this._offersByType = getOffersByType(this._allOffers, this._eventType);
    this._eventDestination = event.destination;
    this._startDate = event.startTime;
    this._endDate = event.endTime;
    this._eventPrice = event.price;
    this._isFavorite = event.isFavorite;

    this.rerender();
    this.destroyFlatpickr();
  }

  disableForm() {
    this.getElement().querySelectorAll(`input`)
      .forEach((input) => (input.disabled = true));

    this.getElement().querySelectorAll(`button`)
      .forEach((button) => (button.disabled = true));
  }

  getData() {
    const form = this.getElement();

    return new FormData(form);
  }

  setData(data) {
    this._externalData = Object.assign({}, buttonText, data);

    this.rerender();
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

  destroyFlatpickr() {
    if (this._flatpickrStartTime) {
      this._flatpickrStartTime.destroy();
      this._flatpickrStartTime = null;
    }
    if (this._flatpickrEndTime) {
      this._flatpickrEndTime.destroy();
      this._flatpickrEndTime = null;
    }
  }

  applyFlatpickr() {
    const startTimeInput = this.getElement().querySelector(`#event-start-time-1`);
    const endTimeInput = this.getElement().querySelector(`#event-end-time-1`);

    this.destroyFlatpickr();

    this._flatpickrStartTime = this._getFlatpickrStartTime(startTimeInput, this._startDate);
    this._flatpickrEndTime = this._getFlatpickrEndTime(endTimeInput, this._endDate);
  }

  _setFlatpickr() {
    return {
      'altInput': true,
      'enableTime': true,
      'altFormat': FormatDate.DEFAULT,
      'time_24hr': true,
    };
  }

  _getFlatpickrStartTime(timeInput, date) {
    return flatpickr(timeInput, Object.assign({}, {defaultDate: date}, this._setFlatpickr()));
  }

  _getFlatpickrEndTime(timeInput, date) {
    return flatpickr(timeInput, Object.assign({}, {defaultDate: date, minDate: this._startDate}, this._setFlatpickr()));
  }

  _getFlatpickrUpdate(timeInput, date) {
    const defaultDate = (this._endDate > date) ? this._endDate : date;

    return flatpickr(timeInput, Object.assign({}, {defaultDate, minDate: date}, this._setFlatpickr()));
  }

  _onEventTypeChange(evt) {
    this._eventType = evt.target.value;

    this._offersByType = getOffersByType(this._allOffers, this._eventType);
    this._eventOffers = [];

    this.rerender();
  }

  _onDestinationChange(input) {
    return (evt) => {
      evt.preventDefault();

      const currentCity = evt.target.value;
      const index = this._allDestinations.map((destination) => destination.name).indexOf(currentCity);

      if (index === -1) {
        input.setCustomValidity(`Please select the destination from the list`);

        return;
      }

      this._eventDestination = this._allDestinations[index];

      this.rerender();
    };
  }

  _onStartDateChange(input) {
    return (evt) => {
      this._startDate = evt.target.value;
      this._endDate = (this._endDate > this._startDate) ? this._endDate : this._startDate;

      this._flatpickrEndTime = this._getFlatpickrUpdate(input, this._startDate);
    };
  }

  _onEndDateChange(evt) {
    this._endDate = evt.target.value;
  }

  _onPriceChange(input) {
    return (evt) => {
      const inputPrice = evt.target.value;

      if (inputPrice.match(/\D+/)) {
        input.setCustomValidity(`Please input numbers only`);
      } else {
        input.setCustomValidity(``);
      }

      this._eventPrice = inputPrice;
    };
  }

  _onOffersChange(eventOffers) {
    return (evt) => {
      const currentOffer = evt.target;
      currentOffer.toggleAttribute(`checked`);

      const checkedOffers = [...eventOffers.querySelectorAll(`input`)].filter((input) => input.checked);
      const checkedOffersValue = [...checkedOffers].map((offer) => offer.value);

      this._eventOffers = this._offersByType.filter((offer) => checkedOffersValue.includes(offer.title));
    };
  }

  _onFavoriteButtonClick() {
    this._isFavorite = !this._isFavorite;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const eventTypeList = element.querySelector(`.event__type-list`);
    const eventDestination = element.querySelector(`.event__input--destination`);
    const startTimeInput = element.querySelector(`#event-start-time-1`);
    const endTimeInput = element.querySelector(`#event-end-time-1`);
    const eventPrice = element.querySelector(`.event__input--price`);
    const eventOffers = element.querySelector(`.event__available-offers`);
    const favoriteButton = element.querySelector(`.event__favorite-btn`);

    eventTypeList.addEventListener(`change`, this._onEventTypeChange);
    eventDestination.addEventListener(`change`, this._onDestinationChange(eventDestination));
    startTimeInput.addEventListener(`change`, this._onStartDateChange(endTimeInput));
    endTimeInput.addEventListener(`change`, this._onEndDateChange);
    eventPrice.addEventListener(`input`, this._onPriceChange(eventPrice));

    if (eventOffers) {
      eventOffers.addEventListener(`change`, this._onOffersChange(eventOffers));
    }

    if (favoriteButton) {
      favoriteButton.addEventListener(`click`, this._onFavoriteButtonClick);
    }
  }
}
