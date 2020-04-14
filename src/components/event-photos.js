const createImageMarkup = (photo) => `<img class="event__photo" src="${photo}" alt="Event photo"></img>`;

const createPhotos = (photos) => photos.map((createImageMarkup)).join(``);

export {createPhotos};
