import AudioController from './AudioController';
import {Character} from '../objects';
import Game from '../Game';

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
}
