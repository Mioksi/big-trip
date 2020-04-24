import AbstractComponent from '../../abstracts/abstract-component';

const createDayList = () => `<ul class="trip-days"></ul>`;

export default class DayList extends AbstractComponent {
  getTemplate() {
    return createDayList();
  }
}
