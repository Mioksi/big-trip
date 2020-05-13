import {MenuItem} from '../../../common/consts';
import AbstractComponent from '../../abstracts/abstract-component';

const createMenu = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="${MenuItem.TABLE}">Table</a>
    <a class="trip-tabs__btn" href="#" id="${MenuItem.STATS}">Stats</a>
  </nav>`
);

export default class Menu extends AbstractComponent {
  constructor() {
    super();

    this._onMenuItemClick = this.onMenuItemClick.bind(this);
  }

  getTemplate() {
    return createMenu();
  }

  setActiveItem(menuItem) {
    this._removeActiveItem();

    const item = this.getElement().querySelector(`#${menuItem}`);

    if (item) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }

  _removeActiveItem() {
    const items = this.getElement().querySelectorAll(`a`);

    items.forEach((item) => item.classList.remove(`trip-tabs__btn--active`));
  }

  onMenuItemClick(handler) {
    return (evt) => {
      if (!evt.target.id) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    };
  }

  setMenuItemChangeHandler(handler) {
    this.getElement().addEventListener(`click`, this._onMenuItemClick(handler));
  }
}
