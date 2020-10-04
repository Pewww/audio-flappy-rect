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

  constructor(mapWidth: number, mapHeight: number, stream: MediaStream) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.obstacles = [
      new Obstacle(this.mapWidth, this.mapHeight, '#fff')
    ];
    this.status = GAME_STATUS.WAITING;
    this.character = new Character(this.mapWidth, this.mapHeight, '#fff');
    this.audioController = new AudioController(this.character, this, stream);
  }

  public start() {
    this.status = GAME_STATUS.RUNNING;
    this.audioController.connectAnalyser();
  }

  public stop() {
    this.status = GAME_STATUS.OVER;
    this.audioController.disconnectAnalyser();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.audioController.analyseData(ctx);
    this.obstacles.forEach(obstacle => {
      obstacle.draw(ctx)
    });
  }

  public update(timeStamp: number) {
    // 충돌 감지 후 true 면 over
    // const second = Math.floor(timeStamp / 1000);

    // if (second % 5 === 0) {
    //   this.status = GAME_STATUS.OVER;
    //   // this.obstacles.push(new Obstacle());
    // }
  }
}
