import {createEventItem} from './event';

const createEventList = (events) => events.reduce((result, event) => {
  result += createEventItem(event);

  return result;
}, ``);

export {createEventList};
