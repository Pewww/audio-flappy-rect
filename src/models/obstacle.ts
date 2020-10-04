interface IObstaclePosition {
  x: number;
  y: number;
}

export default class Obstacle {
  width: number;
  height: number;
  color: string;
  mapWidth: number;
  mapHeight: number;
  position: IObstaclePosition;

  constructor(mapWidth: number, mapHeight: number, color: string) {
    this.width = 50;
    this.height = 250;
    this.color = color;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.setPosition(this.mapWidth - this.width, 0);
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
