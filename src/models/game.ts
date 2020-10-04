import Character from './character';
import AudioController from './audioController';
import Obstacle from './obstacle';
import {TGameStatus, GAME_STATUS} from '../constants/game';

export default class Game {
  mapWidth: number;
  mapHeight: number;
  character: Character;
  audioController: AudioController;
  obstacles: Obstacle[];
  status: TGameStatus;
  frameNo: number;
  score: number;
  scoreElement: HTMLElement;

  constructor(mapWidth: number, mapHeight: number, stream: MediaStream) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.obstacles = [
      new Obstacle(this.mapWidth, this.mapHeight, '#757eee')
    ];
    this.status = GAME_STATUS.WAITING;
    this.character = new Character(this.mapWidth, this.mapHeight, '#fff');
    this.audioController = new AudioController(this.character, this, stream);
    this.frameNo = 0;
    this.score = 0;
    this.scoreElement = document.getElementById('score');
  }

  public start() {
    this.status = GAME_STATUS.RUNNING;
    this.audioController.connectAnalyser();
  }

  public stop() {
    this.audioController.disconnectAnalyser();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.audioController.analyseData(ctx);
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
      this.obstacles.push(
        new Obstacle(this.mapWidth, this.mapHeight, '#757eee')
      );
    }
  }

  private checkIfObstacleIsOutOfMap() {
    const [firstObstacle] = this.obstacles;

    return (firstObstacle.position.x + firstObstacle.width < 0);
  }

  private removeOutOfMapObstacle() {
    if (this.checkIfObstacleIsOutOfMap()) {
      this.obstacles = this.obstacles.slice(1, this.obstacles.length);
    }
  }

  private checkScore() {
    if (this.checkIfObstacleIsOutOfMap()) {
      this.score += 1;
    }
  }
}
