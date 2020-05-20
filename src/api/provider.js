import Point from '../models/point';

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setDestinations(destinations);

          return destinations;
        });
    }

    const storeDestinations = this._store.getDestinations();

    return Promise.resolve(storeDestinations);
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setOffers(offers);

          return offers;
        });
    }

    const storeOffers = this._store.getOffers();

    return Promise.resolve(storeOffers);
  }

  getPoints() {
    if (this._isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          points.forEach((task) => this._store.setItem(task.id, task.toRAW()));

          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems());

    return Promise.resolve(Point.parsePoints(storePoints));
  }

  createPoint(point) {
    if (this._isOnline()) {
      return this._api.createPoint(point);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  updatePoint(id, data) {
    if (this._isOnline()) {
      return this._api.updatePoint(id, data);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  deletePoint(id) {
    if (this._isOnline()) {
      return this._api.deletePoint(id);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
