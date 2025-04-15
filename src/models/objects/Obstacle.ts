import { CollidedFace } from "../../enums/collision";
import Character from "./Character";
import GameObject from "./GameObject";

type TObstacleDirection = "top" | "bottom";

export default class Obstacle extends GameObject {
  direction: TObstacleDirection;

  constructor(
    height: number,
    mapWidth: number,
    mapHeight: number,
    color: string,
    direction: TObstacleDirection
  ) {
    super({
      width: 50,
      height,
      mapWidth,
      mapHeight,
      color,
    });
    this.direction = direction;
    this.setPosition(
      this.mapWidth - this.width,
      this.direction === "top" ? 0 : this.mapHeight - this.height
    );
  }

  public draw(ctx: CanvasRenderingContext2D, character: Character) {
    if (character.isCollided && character.collidedFace === CollidedFace.Right) {
      this.setPosition(this.position.x, this.position.y);
      this.drawRect(ctx, this.position.x, this.position.y);

      return;
    }

    this.setPosition(this.position.x - 2, this.position.y);
    this.drawRect(ctx, this.position.x, this.position.y);
  }

  private drawRect(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, this.width, this.height);
  }
}
