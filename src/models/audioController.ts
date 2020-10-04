import Character from './character';
import Game from './game';

export default class AudioController {
  private audioCtx: AudioContext;
  private source: MediaStreamAudioSourceNode;
  private analyser: AnalyserNode;
  private bufferLength: number;
  private dataArray: Uint8Array;
  private character: Character;
  private game: Game;

  constructor(character: Character, game: Game, stream: MediaStream) {
    this.audioCtx = new AudioContext();
    this.source = this.audioCtx.createMediaStreamSource(stream);
    this.setAnalyser();
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.character = character;
    this.game = game;
  }

  private setAnalyser() {
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 1024;
  }

  public connectAnalyser() {
    this.source.connect(this.analyser);
  }

  public disconnectAnalyser() {
    this.source.disconnect(this.analyser);
  }

  public analyseData(ctx: CanvasRenderingContext2D) {
    this.analyser.getByteFrequencyData(this.dataArray);

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
