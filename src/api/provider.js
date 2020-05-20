export default class Provider {
  constructor(api) {
    this._api = api;
  }

  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations();
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers();
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  getPoints() {
    if (this._isOnline()) {
      return this._api.getPoints();
    }

    return Promise.reject(`offline logic is not implemented`);
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
