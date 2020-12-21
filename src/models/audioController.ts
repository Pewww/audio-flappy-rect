export default class AudioController {
  protected audioCtx: AudioContext;
  protected source: MediaStreamAudioSourceNode;
  protected analyser: AnalyserNode;
  protected bufferLength: number;
  protected dataArray: Uint8Array;

  constructor(stream: MediaStream) {
    this.audioCtx = new AudioContext();
    this.source = this.audioCtx.createMediaStreamSource(stream);
    this.setAnalyser();
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
  }

  private setAnalyser() {
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 1024;
  }

  protected convertDataToVolume() {
    const volume = this.dataArray.reduce(
      (prev, curr) => prev + curr, 0
    );
    
    return volume;
  }

  public connectAnalyser() {
    this.source.connect(this.analyser);
  }

  public disconnectAnalyser() {
    this.source.disconnect(this.analyser);
  }

  public analyseFrequencyData() {
    this.analyser.getByteFrequencyData(this.dataArray);
  }
}
