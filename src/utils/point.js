class Point {
  constructor(x, y, round = false) {
    this.x = round ? Math.round(x) : x;
    this.y = round ? Math.round(y) : y;
  }

  static toPoint(x, y, round) {
    if (x instanceof Point) {
      return x;
    }
    if (Array.isArray(x)) {
      return new Point(x[0], x[1]);
    }
    if (x === undefined || x === null) {
      return x;
    }
    if (typeof x === 'object' && 'x' in x && 'y' in x) {
      return new Point(x.x, x.y);
    }
    return new Point(x, y, round);
  }

  static zero() {
    return new Point(0, 0);
  }

  clone() {
    return new Point(this.x, this.y);
  }

  add(point) {
    return this.clone()._add(Point.toPoint(point));
  }

  _add(point) {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

  subtract(point) {
    return this.clone()._subtract(Point.toPoint(point));
  }

  _subtract(point) {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }

  divideBy(num) {
    return this.clone()._divideBy(num);
  }

  _divideBy(num) {
    this.x /= num;
    this.y /= num;
    return this;
  }

  multiplyBy(num) {
    return this.clone()._multiplyBy(num);
  }

  _multiplyBy(num) {
    this.x *= num;
    this.y *= num;
    return this;
  }

  scaleBy(point) {
    return new Point(this.x * point.x, this.y * point.y);
  }

  unscaleBy(point) {
    return new Point(this.x / point.x, this.y / point.y);
  }

  round() {
    return this.clone()._round();
  }

  _round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  floor() {
    return this.clone()._floor();
  }

  _floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  ceil() {
    return this.clone()._ceil();
  }

  _ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }

  trunc() {
    return this.clone()._trunc();
  }

  _trunc() {
    this.x = Math.trunc(this.x);
    this.y = Math.trunc(this.y);
    return this;
  }

  distanceTo(point) {
    point = Point.toPoint(point);

    var x = point.x - this.x,
      y = point.y - this.y;

    return Math.sqrt(x * x + y * y);
  }

  equals(point) {
    point = Point.toPoint(point);

    return point.x === this.x && point.y === this.y;
  }

  contains(point) {
    point = Point.toPoint(point);

    return (
      Math.abs(point.x) <= Math.abs(this.x) &&
      Math.abs(point.y) <= Math.abs(this.y)
    );
  }

  toString() {
    return `Point(${this.x}, ${this.y})`;
  }
}

export default Point;
