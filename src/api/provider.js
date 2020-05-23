import Point from '../models/point';
import {nanoid} from "nanoid";

const getSyncedPoints = (items) => items.filter(({success}) => success).map(({payload}) => payload.point);

const createItemStore = (acc, current) => Object.assign({}, acc, {[current.id]: current});
const createStoreStructure = (items) => items.reduce(createItemStore, {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;

    this._getStoreDestinations = this._getStoreDestinations.bind(this);
    this._getStoreOffers = this._getStoreOffers.bind(this);
    this._getStorePoints = this._getStorePoints.bind(this);
    this._getNewPoint = this._getNewPoint.bind(this);
    this._getUpdatePoint = this._getUpdatePoint.bind(this);
    this._syncPoints = this._syncPoints.bind(this);
  }

  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations()
        .then(this._getStoreDestinations);
    }

    const storeDestinations = this._store.getDestinations();

    return Promise.resolve(storeDestinations);
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers()
        .then(this._getStoreOffers);
    }

    const storeOffers = this._store.getOffers();

    return Promise.resolve(storeOffers);
  }

  getPoints() {
    if (this._isOnline()) {
      return this._api.getPoints()
        .then(this._getStorePoints);
    }

    const storePoints = Object.values(this._store.getItems());

    return Promise.resolve(Point.parsePoints(storePoints));
  }

  createPoint(point) {
    if (this._isOnline()) {
      return this._api.createPoint(point)
        .then(this._getNewPoint);
    }

    const localNewPointId = nanoid();
    const localNewPoint = Point.clone(Object.assign(point, {id: localNewPointId}));

    this._store.setItem(localNewPoint.id, localNewPoint.toRAW());

    return Promise.resolve(localNewPoint);
  }

  updatePoint(id, point) {
    if (this._isOnline()) {
      return this._api.updatePoint(id, point)
        .then(this._getUpdatePoint);
    }

    const localPoint = Point.clone(Object.assign(point, {id}));

    this._store.setItem(id, localPoint.toRAW());

    return Promise.resolve(localPoint);
  }

  deletePoint(id) {
    if (this._isOnline()) {
      return this._api.deletePoint(id)
        .then(() => this._store.removeItem(id));
    }

    this._store.removeItem(id);

    return Promise.resolve();
  }

  sync() {
    if (this._isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then(this._syncPoints);
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _getStoreDestinations(destinations) {
    this._store.setDestinations(destinations);

    return destinations;
  }

  _getStoreOffers(offers) {
    this._store.setOffers(offers);

    return offers;
  }

  _getStorePoints(points) {
    const items = createStoreStructure(points.map((point) => point.toRAW()));

    this._store.setItems(items);

    return points;
  }

  _getNewPoint(newPoint) {
    this._store.setItem(newPoint.id, newPoint.toRAW());

    return newPoint;
  }

  _getUpdatePoint(newPoint) {
    this._store.setItem(newPoint.id, newPoint.toRAW());

    return newPoint;
  }

  _syncPoints(response) {
    const createdPoints = response.created;
    const updatedPoints = getSyncedPoints(response.updated);

    const items = createStoreStructure([...createdPoints, ...updatedPoints]);

    this._store.setItems(items);

    return Promise.resolve(items);
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
