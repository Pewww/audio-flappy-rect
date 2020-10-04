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

  constructor(mapWidth: number, mapHeight: number, color: string) {
    this.width = 50;
    this.height = 50;
    this.color = color;
    this.mapHeight = mapWidth;
    this.mapHeight = mapHeight;
    this.setPosition(50, this.mapHeight - 50);
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
    this.detectCollision(x, y);

    // 위치 이동
    this.draw(x, y, ctx);
  }

  private draw(x: number, y: number, ctx: CanvasRenderingContext2D) {
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
    const VOLUMN_CHANGE_DEGREE = 5; // 변하는 높이의 정도(폭) 조절
    let y = this.mapHeight - (volumn * VOLUMN_CHANGE_DEGREE) - this.height;

    if (y < 0) {
      y = 0;
    }

    return {
      x,
      y
    };
  }

  private detectCollision(x: number, y: number) {
    // check obstacles
    // if (x >= this.map.test.x - 50 || y < this.map.test.y) {
    //   this.isCollided = true;
    // }
  }
}
