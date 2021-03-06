export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.startTime = data[`date_from`] ? new Date(data[`date_from`]) : null;
    this.endTime = data[`date_to`] ? new Date(data[`date_to`]) : null;
    this.price = data[`base_price`];
    this.destination = data[`destination`];
    this.offers = data[`offers`] || [];
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'date_from': this.startTime ? this.startTime.toISOString() : null,
      'date_to': this.endTime ? this.endTime.toISOString() : null,
      'base_price': this.price,
      'destination': this.destination,
      'offers': this.offers,
      'is_favorite': this.isFavorite
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
