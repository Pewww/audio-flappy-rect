interface IPosition {
  x: number;
  y: number;
}

interface Props {
  width: number;
  height: number;
  mapWidth: number;
  mapHeight: number;
  color: string;
}

export default class GameObject {
  width: number;
  height: number;
  color: string;
  mapWidth: number;
  mapHeight: number;
  position: IPosition;

  constructor({ width, height, mapWidth, mapHeight, color }: Props) {
    this.width = width;
    this.height = height;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.color = color;
  }

  public setPosition(x: number, y: number) {
    this.position = {
      x,
      y,
    };
  }
}
