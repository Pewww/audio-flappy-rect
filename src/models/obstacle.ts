import GameObject from './gameObject';
import {getRandomDirection} from '../lib/obstacle';

type TObstacleDirection = 'top' | 'bottom';

export default class Obstacle extends GameObject {
  direction: TObstacleDirection;

  constructor(mapWidth: number, mapHeight: number, color: string) {
    super({
      width: 60,
      height: Math.floor(mapHeight / 2) + 50,
      mapWidth,
      mapHeight,
      color
    });
    this.direction = getRandomDirection();
    this.setPosition(this.mapWidth - this.width, this.direction === 'top'
      ? 0
      : this.mapHeight - this.height
    );
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.setPosition(
      this.position.x - 3,
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
