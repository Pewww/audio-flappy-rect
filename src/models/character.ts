import {VOLUMN_CHANGE_DEGREE} from '../constants/game';
import Obstacle from './obstacle';

interface ICharacterPosition {
  x: number;
  y: number;
}

export default class Character {
  width: number;
  height: number;
  color: string;
  mapWidth: number;
  mapHeight: number;
  position: ICharacterPosition;
  isCollided: boolean;

  constructor(mapWidth: number, mapHeight: number, color: string) {
    this.width = 50;
    this.height = 50;
    this.color = color;
    this.mapHeight = mapWidth;
    this.mapHeight = mapHeight;
    this.setPosition(50, this.mapHeight - this.height);
    this.isCollided = false;
  }

  private setPosition(x, y) {
    this.position = {
      x,
      y
    };
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
    for (const obstacle of obstacles) {
      const isXPositionCollided = x + this.width > obstacle.position.x;
      const isYPositionCollided = obstacle.direction === 'top'
        ? y < obstacle.position.y + obstacle.height
        : y > obstacle.position.y;

      if (isXPositionCollided && isYPositionCollided) {
        this.isCollided = true;
        break;
      }
    }
  }
}
