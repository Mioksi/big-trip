import DayItemComponent from '../day-item';
import {render} from '../../../../common/utils/render';

const renderDay = (container, day, index) => {
  const dayItemComponent = new DayItemComponent(day, index);

  render(container, dayItemComponent);
};

export {renderDay};
