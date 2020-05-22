import {formatFirstLetter} from '../../../../common/utils/helpers';

const getCheckedInput = (isChecked) => isChecked ? `checked` : ``;

const createTransferItem = (type, index, isChecked) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${index}" class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${getCheckedInput(isChecked)}
      >
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${index}">${formatFirstLetter(type)}</label>
    </div>`
  );
};

const createTransferItems = (events, type) => {
  return events.map((typeTo, index) => createTransferItem(typeTo, index, typeTo === type)).join(`\n`);
};

const createActivityItem = (type, index, isChecked) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${index}" class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${getCheckedInput(isChecked)}
      >
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${index}">${formatFirstLetter(type)}</label>
    </div>`
  );
};

const createActivityItems = (events, type) => {
  return events.map((typeIn, index) => createActivityItem(typeIn, index, typeIn === type)).join(`\n`);
};

export {createTransferItems, createActivityItems};
