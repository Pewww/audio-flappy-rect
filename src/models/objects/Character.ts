import { DEFAULT_MAX_VOLUME } from "../../constants/game";
import Obstacle from "./Obstacle";
import GameObject from "./GameObject";
import { CollidedFace } from "../../enums/collision";

export default class Character extends GameObject {
  private _isCollided: boolean;
  private _collidedWith: Obstacle;
  private _collidedFace: CollidedFace;

  constructor(mapWidth: number, mapHeight: number, color: string) {
    super({
      width: 40,
      height: 40,
      mapWidth,
      mapHeight,
      color,
    });
    this.setPosition(50, this.mapHeight - this.height);
    this._isCollided = false;
    this._collidedWith = null;
    this._collidedFace = null;
  }

  public get isCollided() {
    return this._isCollided;
  }

  public get collidedWith() {
    return this._collidedWith;
  }

  public get collidedFace() {
    return this._collidedFace;
  }

  public notify(
    volumn: number,
    obstacles: Obstacle[],
    ctx: CanvasRenderingContext2D
  ) {
    const { x, y } = this.filterToValidPosition(volumn);

    // 충돌 감지
    this.detectCollision(x, y, obstacles);

    // 위치 이동
    this.updatePosition(x, y, ctx);
  }

  private updatePosition(x: number, y: number, ctx: CanvasRenderingContext2D) {
    if (
      this.collidedFace !== null &&
      this.collidedFace !== CollidedFace.Right
    ) {
      const filteredYPosition =
        this.collidedFace === CollidedFace.Bottom
          ? this.collidedWith.position.y - this.height
          : this.collidedWith.height + this.collidedWith.position.y;

      this.draw(x, filteredYPosition, ctx);

      return;
    }

    this.draw(x, y, ctx);

    return;
  }

  private draw(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.setPosition(x, y);
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, this.width, this.height);

    this.drawCharacterFace(x, y, ctx);
  }

  private drawCharacterFace(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D
  ) {
    ctx.fillStyle = "#202020";

    ctx.fillRect(x + 7, y + 12, 10, 7);
    ctx.fillRect(x + this.width - 17, y + 12, 10, 7);
    ctx.fillRect(x + 7, y + 24, this.width - 14, 7);
  }

  private filterToValidPosition(volumn: number) {
    const maxVolume =
      parseInt(localStorage.getItem("audio-flappy-bird-max-volume"), 10) ||
      DEFAULT_MAX_VOLUME;

    const x = this.position.x;
    let y = Math.ceil(this.mapHeight * (1 - volumn / maxVolume)) - this.height;

    if (y < 0) {
      y = 0;
    }

    return {
      x,
      y,
    };
  }

  private detectCollision(x: number, y: number, obstacles: Obstacle[]) {
    const [topObstacle, bottomObstacle] = obstacles;

    // 기준점이 topObstacle이 되어도 무방함
    const isXPositionCollided =
      x + this.width >= bottomObstacle.position.x &&
      bottomObstacle.position.x > 0;

    const isTopYPositionCollided =
      isXPositionCollided && y < topObstacle.height;
    const isBottomYPositionCollided =
      isXPositionCollided &&
      y > this.mapHeight - bottomObstacle.height - this.height;

    const isYPositionCollided =
      isTopYPositionCollided || isBottomYPositionCollided;

    // 캐릭터와 장애물이 맞닿는 대상을 인식하기 위한 값
    const Distances = {
      [CollidedFace.Top]: Math.abs(y - topObstacle.height),
      [CollidedFace.Bottom]: Math.abs(
        y + this.height - (this.mapHeight - bottomObstacle.height)
      ),
      [CollidedFace.Right]: Math.abs(
        x + this.width - bottomObstacle.position.x
      ),
    };

    if (isXPositionCollided && isYPositionCollided) {
      this._isCollided = true;
      this._collidedWith = isTopYPositionCollided
        ? topObstacle
        : bottomObstacle;

      // 캐릭터와 장애물의 위치 차이가 가까운 곳이 충돌의 대상이 됨.
      if (Distances[CollidedFace.Right] === 0) {
        this._collidedFace = CollidedFace.Right;

        return;
      }

      this._collidedFace =
        Distances[CollidedFace.Top] < Distances[CollidedFace.Bottom]
          ? CollidedFace.Top
          : CollidedFace.Bottom;
    }

    return;
  }
}
