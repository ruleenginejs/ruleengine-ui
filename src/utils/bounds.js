class Bounds {
  constructor(a, b) {
    this.min = null;
    this.max = null;

    if (a) this.extend(a);
    if (b) this.extend(b);
  }

  extend({ x, y }) {
    if (!this.min && !this.max) {
      this.min = { x, y };
      this.max = { x, y };
    } else {
      this.min.x = Math.min(x, this.min.x);
      this.max.x = Math.max(x, this.max.x);
      this.min.y = Math.min(y, this.min.y);
      this.max.y = Math.max(y, this.max.y);
    }

    return this;
  }

  getCenter() {
    return {
      x: (this.min.x + this.max.x) / 2,
      y: (this.min.y + this.max.y) / 2
    };
  }

  getBottomLeft() {
    return { x: this.min.x, y: this.max.y };
  }

  getTopRight() {
    return { x: this.max.x, y: this.min.y };
  }

  getTopLeft() {
    return this.min;
  }

  getBottomRight() {
    return this.max;
  }

  getSize() {
    return {
      x: this.max.x - this.min.x,
      y: this.max.y - this.min.y
    };
  }

  contains(obj) {
    let min, max;

    if (obj instanceof Bounds) {
      min = obj.min;
      max = obj.max;
    } else {
      min = max = obj;
    }

    return (min.x >= this.min.x) &&
      (max.x <= this.max.x) &&
      (min.y >= this.min.y) &&
      (max.y <= this.max.y);
  }
}

export default Bounds;
