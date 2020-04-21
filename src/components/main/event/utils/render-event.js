import EventItemComponent from '../event-item';
import EventEditComponent from '../event-edit';
import {render, isEscEvent} from '../../../../common/utils';

const renderEvent = (container, event) => {
  const eventItemComponent = new EventItemComponent(event);
  const rollupButton = eventItemComponent.getElement().querySelector(`.event__rollup-btn`);

  const eventEditComponent = new EventEditComponent(event);
  const buttonSave = eventEditComponent.getElement().querySelector(`.event__save-btn`);

  const replaceEventToEdit = () => {
    container.replaceChild(eventEditComponent.getElement(), eventItemComponent.getElement());
  };

  const replaceEditToEvent = () => {
    container.replaceChild(eventItemComponent.getElement(), eventEditComponent.getElement());
  };

  const onFormEscPress = (evt) => {
    isEscEvent(evt, replaceEditToEvent);

    document.removeEventListener(`keydown`, onFormEscPress);
  };

  const onRollupButtonClick = () => {
    replaceEventToEdit();

    document.addEventListener(`keydown`, onFormEscPress);
  };

  const onFormSave = (evt) => {
    evt.preventDefault();

    replaceEditToEvent();

    document.removeEventListener(`keydown`, onFormEscPress);
  };

  rollupButton.addEventListener(`click`, onRollupButtonClick);
  buttonSave.addEventListener(`click`, onFormSave);

  render(container, eventItemComponent.getElement());
};

export {renderEvent};
