import EventItemComponent from '../event-item';
import {render} from '../../../../common/utils';

const renderEvent = (container, event) => {
  const eventItemComponent = new EventItemComponent(event);

  render(container, eventItemComponent.getElement());
};

export {renderEvent};
