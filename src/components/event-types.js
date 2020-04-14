const createTransferItem = (type, index) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${index}">${type}</label>
    </div>`
  );
};

const createTransferItems = (events, type) => {
  return events.map((event, index) => createTransferItem(event, index, type)).join(``);
};

const createActivityItem = (type, index) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${index}">${type}</label>
    </div>`
  );
};

const createActivityItems = (events, type) => {
  return events.map((event, index) => createActivityItem(event, index, type)).join(``);
};

export {createTransferItems, createActivityItems};
