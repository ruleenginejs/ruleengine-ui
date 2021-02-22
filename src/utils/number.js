export function toInt(value, defaults = null) {
  let num = Number.parseInt(value, 10);
  return Number.isNaN(num) ? defaults : num;
}

export function toFloat(value, defaults = null) {
  let num = Number.parseFloat(value, 10);
  return Number.isNaN(num) ? defaults : num;
}
