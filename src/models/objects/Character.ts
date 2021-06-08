import {DEFAULT_MAX_VOLUME} from '../../constants/game';
import Obstacle from './Obstacle';
import GameObject from './GameObject';

export default class Character extends GameObject {
  public isCollided: boolean;
  private collidedWith: Obstacle;

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
    this.collidedWith = null;
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
    // if (this.isCollided) {
    //   console.log("current x and y", x, y);
    //   console.log(this.collidedWith)
    //   // const currX = x;
    //   // const currY = this.collidedWith.direction === 'top'
    //   //   ? this.collidedWith.height
    //   //   : this.mapHeight - this.collidedWith.height - this.height;

    //   // console.log("obstacle", this.collidedWith)
    //   // console.log("me", this.width, this.height, this.position)
    //   // ctx.fillStyle = this.color;
    //   // ctx.fillRect(
    //   //   currX,
    //   //   currY,
    //   //   this.width,
    //   //   this.height
    //   // )
    //   // this.drawCharacterFace(currX, currY, ctx)
    // } else {
      
    // }
  }

  private drawCharacterFace(x: number, y: number, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#202020';

    ctx.fillRect(x + 7, y + 12, 10, 7);
    ctx.fillRect(x + this.width - 17, y + 12, 10, 7);
    ctx.fillRect(x + 7, y + 24, this.width - 14, 7);
  }

  private filterToValidPosition(volumn: number) {
    const maxVolume = parseInt(
      localStorage.getItem('audio-flappy-bird-max-volume'),
      10
    ) || DEFAULT_MAX_VOLUME;

    const x = this.position.x;
    let y = Math.ceil(this.mapHeight * (1 - (volumn / maxVolume))) - this.height;

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

    const isTopYPositionCollided = y < topObstacle.height;
    const isBottomYPositionCollided = y > (this.mapHeight - bottomObstacle.height - this.height);

    const isYPositionCollided = isTopYPositionCollided
      || isBottomYPositionCollided;

    if (isXPositionCollided && isYPositionCollided) {
      this.isCollided = true;
      this.collidedWith = isTopYPositionCollided
        ? topObstacle
        : bottomObstacle;

      return;
    }
  }
}
