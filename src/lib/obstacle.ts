export const getRandomHeights = (mapHeight: number, gap: number) => {
  const totalRate = 10;
  const ratioFromTop = Math.floor(Math.random() * totalRate + 1);
  const ratioFromBottom = totalRate - ratioFromTop;
  const halfOfGap = Math.floor(gap / 2);

  const heightFromTop = Math.floor((mapHeight / totalRate) * ratioFromTop) - halfOfGap;
  const heightFromBottom = Math.floor((mapHeight / totalRate) * ratioFromBottom) - halfOfGap;

  return {
    heightFromTop,
    heightFromBottom: heightFromBottom < 0
      ? 0
      : heightFromBottom
  };
};
