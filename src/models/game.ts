import Character from './character';
import AudioController from './audioController';
import Obstacle from './obstacle';

export default class Game {
  mapWidth: number;
  mapHeight: number;
  character: Character;
  audioController: AudioController;
  obstacles: Obstacle[];

  constructor(mapWidth: number, mapHeight: number, stream: MediaStream) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.obstacles = [];
    this.character = new Character(mapWidth, mapHeight, '#fff');
    this.audioController = new AudioController(this.character, this, stream);
  }

  public start() {
    this.audioController.connectAnalyser();
  }

  public update(ctx: CanvasRenderingContext2D) {
    this.audioController.analyseData(ctx);
  }
}
