import {createElement} from '../../../common/utils';

const createDayList = () => `<ul class="trip-days"></ul>`;

export default class DayList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDayList();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
