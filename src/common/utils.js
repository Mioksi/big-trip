import {POINT_AMOUNT, Place} from '../common/consts.js';
import {createEventItem} from '../components/event.js';

export const render = (container, template, place = Place.BEFOREEND) => container.insertAdjacentHTML(place, template);

export const renderEventList = (container) => {
  for (let i = 0; i < POINT_AMOUNT; i++) {
    render(container, createEventItem());
  }
};
