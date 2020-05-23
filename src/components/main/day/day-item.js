import {getIsoDate, formatMonth, formatDay} from '../../../common/utils/helpers';
import AbstractComponent from '../../abstracts/abstract-component';

const isEmptyIndex = (index) => index ? index : ``;
const isEmptyDay = (day, value) => day ? value : ``;

const createDayItem = (day, index) => {
  const dateValue = getIsoDate(day);
  const month = formatMonth(day);
  const date = formatDay(day);
  const dateTitle = `${month} ${date}`;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${isEmptyIndex(index)}</span>
        <time class="day__date" datetime="${isEmptyDay(day, dateValue)}">${isEmptyDay(day, dateTitle)}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class DayItem extends AbstractComponent {
  constructor(day, index) {
    super();

    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createDayItem(this._day, this._index);
  }
}
