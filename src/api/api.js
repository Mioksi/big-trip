import Point from '../models/point';
import {Method, StatusCode, Url} from '../common/consts';

const checkStatus = (response) => {
  if (response.status >= StatusCode.SUCCESS && response.status < StatusCode.REDIRECT) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getDestinations() {
    return this._load({url: Url.DESTINATIONS})
      .then((response) => response.json());
  }

  getOffers() {
    return this._load({url: Url.OFFERS})
      .then((response) => response.json());
  }

  getPoints() {
    return this._load({url: Url.POINTS})
      .then((response) => response.json())
      .then(Point.parsePoints);
  }

  createPoint(point) {
    return this._load(this._getCreatePointConfig(point))
      .then((response) => response.json())
      .then(Point.parsePoint)
      .catch((err) => {
        throw err;
      });
  }

  deletePoint(id) {
    return this._load({url: `${Url.POINTS}/${id}`, method: Method.DELETE});
  }

  updatePoint(id, data) {
    return this._load(this._getUpdatePointConfig(id, data))
      .then((response) => response.json())
      .then(Point.parsePoint)
      .catch((err) => {
        throw err;
      });
  }

  _getCreatePointConfig(point) {
    return this._getLoadConfig(Url.POINTS, Method.POST, point);
  }

  _getUpdatePointConfig(id, data) {
    return this._getLoadConfig(`${Url.POINTS}/${id}`, Method.PUT, data);
  }

  _getLoadConfig(url, method, data) {
    return {
      url,
      method,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    };
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
