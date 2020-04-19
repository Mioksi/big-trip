import EventItemComponent from '../event-item';
import EventEditComponent from '../event-edit';
import {render} from '../../../../common/utils';

const renderEvent = (container, event) => {
  const eventItemComponent = new EventItemComponent(event);
  const rollupButton = eventItemComponent.getElement().querySelector(`.event__rollup-btn`);

  const eventEditComponent = new EventEditComponent(event);
  const buttonSave = eventEditComponent.getElement().querySelector(`.event__save-btn`);

  const onRollupButtonClick = () => {
    container.replaceChild(eventEditComponent.getElement(), eventItemComponent.getElement());
  };

  const onFormSave = (evt) => {
    evt.preventDefault();

    container.replaceChild(eventItemComponent.getElement(), eventEditComponent.getElement());
  };

  rollupButton.addEventListener(`click`, onRollupButtonClick);
  buttonSave.addEventListener(`click`, onFormSave);

  render(container, eventItemComponent.getElement());
};

export {renderEvent};
