import GameObject from './gameObject';

type TObstacleDirection = 'top' | 'bottom';

export default class Obstacle extends GameObject {
  direction: TObstacleDirection;

  constructor(height: number, mapWidth: number, mapHeight: number, color: string, direction: TObstacleDirection) {
    super({
      width: 60,
      height,
      mapWidth,
      mapHeight,
      color
    });
    this.direction = direction;
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
