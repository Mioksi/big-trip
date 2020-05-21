import AbstractComponent from '../../abstracts/abstract-component';

const createEventContainer = () => `<li class="trip-events__item"></li>`;

export default class EventContainer extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createEventContainer();
  }
}
