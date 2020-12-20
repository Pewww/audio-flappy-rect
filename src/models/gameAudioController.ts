import AudioController from './audioController';
import Character from './character';
import Game from './game';

export default class GameAudioController extends AudioController {
  private character: Character;
  private game: Game;

  constructor(character: Character, game: Game, stream: MediaStream) {
    super(stream);
    this.character = character;
    this.game = game;
  }

  public notifyAnalysedDataToCharacter(ctx: CanvasRenderingContext2D) {
    this.analyseFrequencyData();

    const volume = this.convertDataToVolume();
    this.character.notify(volume, this.game.obstacles, ctx);
  }

  private convertDataToVolume() {
    const volumes = this.dataArray.reduce(
      (prev, curr) => prev + curr, 0
    );
    const averageVolume = Math.floor(volumes / this.bufferLength);
    
    return averageVolume;
  }
}
