const createImageMarkup = (photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`;

const createPhotos = (photos) => photos.map((photo) => createImageMarkup(photo.src)).join(``);

export {createPhotos};
