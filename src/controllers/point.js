import {ESC_KEY, Mode} from '../common/consts';
import {render, replace} from '../common/utils/render';
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

  render(event) {
    const oldEventItemComponent = this._eventItemComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventItemComponent = new EventItemComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    this._eventItemComponent.setRollupButtonClickHandler(() => {
      this._replaceEventToEdit();

      document.addEventListener(`keydown`, this._onFormEscPress);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      this._replaceEditToEvent();
    });

    this._eventEditComponent.setFavoriteButtonHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite
      }));
    });

    if (oldEventEditComponent && oldEventItemComponent) {
      replace(this._eventItemComponent, oldEventItemComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      render(this._container, this._eventItemComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEditToEvent() {
    this._eventEditComponent.reset();

    this._mode = Mode.DEFAULT;

    replace(this._eventItemComponent, this._eventEditComponent);

    document.removeEventListener(`keydown`, this._onFormEscPress);
  }

  _replaceEventToEdit() {
    this._onViewChange();

    this._mode = Mode.EDIT;

    replace(this._eventEditComponent, this._eventItemComponent);
  }

  _onFormEscPress(evt) {
    if (evt.key === ESC_KEY) {
      this._replaceEditToEvent();

      document.removeEventListener(`keydown`, this._onFormEscPress);
    }
  }
}
