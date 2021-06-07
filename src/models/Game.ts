import {Character, Obstacle} from './objects';
import {GameAudioController} from '../controllers';
import {TGameStatus, GAME_STATUS} from '../constants/game';
import {getRandomHeights} from '../lib/obstacle';

export default class Game {
  mapWidth: number;
  mapHeight: number;
  character: Character;
  gameAudioController: GameAudioController;
  obstacles: Obstacle[];
  status: TGameStatus;
  frameNo: number;
  score: number;
  scoreElement: HTMLElement;

  constructor(mapWidth: number, mapHeight: number, stream: MediaStream) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.status = GAME_STATUS.WAITING;
    this.character = new Character(this.mapWidth, this.mapHeight, '#fff');
    this.gameAudioController = new GameAudioController(this.character, this, stream);
    this.frameNo = 0;
    this.score = 0;
    this.scoreElement = document.getElementById('score');

    const {
      heightFromTop,
      heightFromBottom
    } = getRandomHeights(this.mapHeight, 240);

    this.obstacles = [
      new Obstacle(heightFromTop, this.mapWidth, this.mapHeight, '#757eee', 'top'),
      new Obstacle(heightFromBottom, this.mapWidth, this.mapHeight, '#757eee', 'bottom')
    ];
  }

  public start() {
    this.status = GAME_STATUS.RUNNING;
    this.gameAudioController.connectAnalyser();
  }

  public stop() {
    this.status = GAME_STATUS.OVER;
    this.gameAudioController.disconnectAnalyser();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.gameAudioController.notifyAnalysedDataToCharacter(ctx);
    this.obstacles.forEach(obstacle => {
      obstacle.draw(ctx)
    });
    this.scoreElement.innerText = this.score.toString();
  }

  public update() {
    if (this.character.isCollided) {
      this.status = GAME_STATUS.OVER;
    }

    this.frameNo += 1;
    this.appendObstaclePerTime(125);
    this.checkScore();
    this.removeOutOfMapObstacle();
  }

  private appendObstaclePerTime(no: number) {
    if (this.frameNo % no === 0) {
      const {
        heightFromTop,
        heightFromBottom
      } = getRandomHeights(this.mapHeight, 240);

      this.obstacles.push(
        new Obstacle(heightFromTop, this.mapWidth, this.mapHeight, '#757eee', 'top'),
        new Obstacle(heightFromBottom, this.mapWidth, this.mapHeight, '#757eee', 'bottom')
      );
    }
  }

  private checkIfObstacleIsOutOfMap() {
    const [standardObstacle] = this.obstacles;

    return standardObstacle.position.x + standardObstacle.width < 0;
  }

  private removeOutOfMapObstacle() {
    if (this.checkIfObstacleIsOutOfMap()) {
      this.obstacles = this.obstacles.slice(2, this.obstacles.length);
    }
  }

  private checkScore() {
    if (this.checkIfObstacleIsOutOfMap()) {
      this.score += 1;
    }
  }
}
