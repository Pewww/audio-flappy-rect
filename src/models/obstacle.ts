import {getRandomDirection} from '../lib/obstacle';

interface IObstaclePosition {
  x: number;
  y: number;
}

type TObstacleDirection = 'top' | 'bottom';

export default class Obstacle {
  width: number;
  height: number;
  color: string;
  mapWidth: number;
  mapHeight: number;
  position: IObstaclePosition;
  direction: TObstacleDirection;

  constructor(mapWidth: number, mapHeight: number, color: string) {
    this.width = 60;
    this.height = 400;
    this.color = color;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.direction = getRandomDirection();
    this.setPosition(this.mapWidth - this.width, this.direction === 'top'
      ? 0
      : this.mapHeight - this.height
    );
  }

  private setPosition(x, y) {
    this.position = {
      x,
      y
    };
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.setPosition(
      this.position.x - 2,
      this.position.y
    );

    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
