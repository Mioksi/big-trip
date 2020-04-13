import {EVENTS_AMOUNT} from "../common/consts";
import {createDayInfo} from "./day-info";
import {createEventList} from "./event-list";
import {generateTripEvents} from "../mock/event";

const events = generateTripEvents(EVENTS_AMOUNT);

const createDayItem = () => (
  `<li class="trip-days__item  day">
    ${createDayInfo()}
    <ul class="trip-events__list">
    ${createEventList(events)}
    </ul>
  </li>`
);

export {createDayItem};
