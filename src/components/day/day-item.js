import {MONTHS} from '../../common/consts';
import {getIsoDate} from '../../common/utils';

const createDayItem = (day, index) => {
  const date = new Date(day);
  const dateValue = getIsoDate(date);
  const dateTitle = `${MONTHS[date.getMonth()]} ${date.getDate()}`;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${dateValue.substr(0, 10)}">${dateTitle}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

const createDayItems = (dates) => dates.map(createDayItem).join(``);

export {createDayItems};
