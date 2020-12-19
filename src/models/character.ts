import {VOLUMN_CHANGE_DEGREE} from '../constants/game';
import Obstacle from './obstacle';
import GameObject from './gameObject';

export default class Character extends GameObject {
  isCollided: boolean;

  constructor(mapWidth: number, mapHeight: number, color: string) {
    super({
      width: 40,
      height: 40,
      mapWidth,
      mapHeight,
      color
    });
    this.setPosition(50, this.mapHeight - this.height);
    this.isCollided = false;
  }

  public notify(volumn: number, obstacles: Obstacle[], ctx: CanvasRenderingContext2D) {
    const {
      x,
      y
    } = this.filterToValidPosition(volumn);

    // 충돌 감지
    this.detectCollision(x, y, obstacles);

    // 위치 이동
    this.updatePosition(x, y, ctx);
  }

  private updatePosition(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.setPosition(x, y);

    ctx.fillStyle = this.color;
    ctx.fillRect(
      x,
      y,
      this.width,
      this.height
    );

    this.drawCharacterFace(x, y, ctx);
  }

  private drawCharacterFace(x: number, y: number, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#202020';

    ctx.fillRect(x + 7, y + 12, 10, 7);
    ctx.fillRect(x + this.width - 17, y + 12, 10, 7);
    ctx.fillRect(x + 7, y + 24, this.width - 14, 7);
  }

  private filterToValidPosition(volumn: number) {
    const x = this.position.x;
    let y = this.mapHeight - (volumn * VOLUMN_CHANGE_DEGREE) - this.height;

    if (y < 0) {
      y = 0;
    }

    return {
      x,
      y
    };
  }

  private detectCollision(x: number, y: number, obstacles: Obstacle[]) {
    const [topObstacle, bottomObstacle] = obstacles;

    // 기준점이 topObstacle이 되어도 무방함
    const isXPositionCollided = x + this.width > bottomObstacle.position.x
      && bottomObstacle.position.x > 0;

    const isYPositionCollided = y < (topObstacle.position.y + topObstacle.height)
      || y > (this.mapHeight - bottomObstacle.height - this.height);

    if (isXPositionCollided && isYPositionCollided) {
      this.isCollided = true;
      return;
    }
  }
}
