import Character from './character';

export default class AudioController {
  private audioCtx: AudioContext;
  private source: MediaStreamAudioSourceNode;
  private analyser: AnalyserNode;
  private bufferLength: number;
  private dataArray: Uint8Array;
  private character: Character;

  constructor(character: Character, stream: MediaStream) {
    this.audioCtx = new AudioContext();
    this.source = this.audioCtx.createMediaStreamSource(stream);
    this.setAnalyser();
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.character = character;
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

  public analyseData() {
    this.analyser.getByteFrequencyData(this.dataArray);

    const volume = this.convertDataToVolume();

    this.character.notify(volume);
  }

  private convertDataToVolume() {
    const volumes = this.dataArray.reduce(
      (prev, curr) => prev + curr, 0
    );
    const averageVolume = Math.floor(volumes / this.bufferLength);
    
    return averageVolume;
  }
}
