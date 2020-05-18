import {ESC_KEY, Mode, emptyPoint, Place} from '../common/consts';
import {getOffersByType} from '../common/utils/helpers';
import {render, replace, remove} from '../common/utils/render';
import EventItemComponent from '../components/main/event/event-item';
import EventEditComponent from '../components/main/event/event-edit';
import PointModel from '../models/point';
import {encode} from 'he';

const parseFormData = (formData, id, destinations, offers) => {
  const type = formData.get(`event-type`);
  const city = encode(formData.get(`event-destination`));
  const startTime = formData.get(`event-start-time`);
  const endTime = formData.get(`event-end-time`);
  const eventOffers = formData.getAll(`event-offer`);
  const isFavorite = formData.get(`event-favorite`);

  const destination = destinations.find((item) => {
    return city === item.name;
  });

  const offersByType = getOffersByType(offers, type);
  const checkedOffers = offersByType.filter((offer) => eventOffers.includes(offer.title));

  return new PointModel({
    id,
    type,
    'date_from': startTime ? new Date(startTime) : null,
    'date_to': endTime ? new Date(endTime) : null,
    'base_price': parseInt(encode(formData.get(`event-price`)), 10),
    'destination': {
      'name': destination.name,
      'description': destination.description,
      'pictures': destination.pictures.map((picture) => {
        return {
          src: picture.src,
          description: picture.description,
        };
      })
    },
    'offers': checkedOffers,
    'is_favorite': isFavorite,
  });
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, destinations, offers) {
    this._mode = Mode.DEFAULT;

    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._offers = offers;
    this._destinations = destinations;

    this._eventItemComponent = null;
    this._eventEditComponent = null;

    this._onFormEscPress = this._onFormEscPress.bind(this);
  }

  render(event, mode) {
    const oldEventItemComponent = this._eventItemComponent;
    const oldEventEditComponent = this._eventEditComponent;
    const modeTypes = {
      [Mode.DEFAULT]: () => this._renderEvent(oldEventEditComponent, oldEventItemComponent),
      [Mode.ADDING]: () => this._renderNewEvent(oldEventEditComponent, oldEventItemComponent)
    };

    this._mode = mode;

    this._eventItemComponent = new EventItemComponent(event);
    this._eventEditComponent = new EventEditComponent(event, mode, this._offers, this._destinations);

    this._addHandlers(event);

    modeTypes[mode]();
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventItemComponent);

    document.removeEventListener(`keydown`, this._onFormEscPress);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _addHandlers(event) {
    this._eventItemComponent.setRollupButtonClickHandler(() => {
      this._replaceEventToEdit();

      document.addEventListener(`keydown`, this._onFormEscPress);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      const formData = this._eventEditComponent.getData();
      const data = parseFormData(formData, event.id, this._destinations, this._offers);

      this._onDataChange(this, event, data);
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

    this._eventEditComponent.setFavoriteButtonHandler(() => {
      const newPoint = PointModel.clone(event);

      newPoint.isFavorite = !newPoint.isFavorite;

      this._onDataChange(this, event, newPoint);
    });

    this._eventEditComponent.setRollupButtonHandler(() => {
      this._replaceEditToEvent();
    });
  }

  _renderEvent(oldEventEditComponent, oldEventItemComponent) {
    if (oldEventEditComponent && oldEventItemComponent) {
      replace(this._eventItemComponent, oldEventItemComponent);
      replace(this._eventEditComponent, oldEventEditComponent);

      this._replaceEditToEvent();
    } else {
      render(this._container, this._eventItemComponent);
    }
  }

  _renderNewEvent(oldEventEditComponent, oldEventItemComponent) {
    if (oldEventEditComponent && oldEventItemComponent) {
      remove(oldEventItemComponent);
      remove(oldEventEditComponent);
    }

    render(this._container, this._eventEditComponent, Place.AFTERBEGIN);

    this._eventEditComponent.applyFlatpickr();

    document.addEventListener(`keydown`, this._onFormEscPress);
  }

  _replaceEditToEvent() {
    this._eventEditComponent.reset();

    this._mode = Mode.DEFAULT;

    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._eventItemComponent, this._eventEditComponent);
    }

    document.removeEventListener(`keydown`, this._onFormEscPress);
  }

  _replaceEventToEdit() {
    this._onViewChange();
    this._eventEditComponent.applyFlatpickr();

    this._mode = Mode.EDIT;

    replace(this._eventEditComponent, this._eventItemComponent);
  }

  _onFormEscPress(evt) {
    if (evt.key === ESC_KEY || evt.key === ESC_KEY && this._mode === Mode.ADDING) {
      this._onDataChange(this, emptyPoint, null);

      this._replaceEditToEvent();

      document.removeEventListener(`keydown`, this._onFormEscPress);
    }
  }
}
