export const getRandomDirection = () =>
  Math.floor(Math.random() * 2) === 1
    ? 'top'
    : 'bottom';
