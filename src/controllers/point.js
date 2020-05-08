import {ESC_KEY, Mode, emptyPoint, Place} from '../common/consts';
import {render, replace, remove} from '../common/utils/render';
import EventItemComponent from '../components/main/event/event-item';
import EventEditComponent from '../components/main/event/event-edit';

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._mode = Mode.DEFAULT;

    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

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
    this._eventEditComponent = new EventEditComponent(event, mode);

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

      const data = this._eventEditComponent.getData();

      this._onDataChange(this, event, data);
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

    this._eventEditComponent.setFavoriteButtonHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite
      }));
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
