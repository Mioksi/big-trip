import {createOffers} from './event-offers';
import {getEventInfo} from './common/event-info';

const createEventItem = (event) => {
  const {type, city, price, offers} = event;
  const [eventType, start, end, startDate, endDate] = getEventInfo(event);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
        </div>
        <h3 class="event__title">${eventType} ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate.substr(0, 16)}">${start}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate.substr(0, 16)}">${end}</time>
          </p>
          <p class="event__duration">30M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
            ${createOffers(offers)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export {createEventItem};
