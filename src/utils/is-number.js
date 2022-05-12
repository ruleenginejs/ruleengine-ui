export default value =>
  typeof value === 'number' &&
  value === Number(value) &&
  value !== Infinity &&
  value !== -Infinity;
