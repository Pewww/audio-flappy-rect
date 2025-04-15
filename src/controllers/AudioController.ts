export default class AudioController {
  protected audioCtx: AudioContext;
  protected source: MediaStreamAudioSourceNode;
  protected analyser: AnalyserNode;
  protected bufferLength: number;
  protected dataArray: Float32Array;

  private smoothedVolume: number;

  // 값이 1에 가까울수록 부드럽게 움직인다.
  private SMOOTHING_FACTOR = 0.95;

  constructor(stream: MediaStream) {
    this.audioCtx = new AudioContext();
    this.source = this.audioCtx.createMediaStreamSource(stream);
    this.setAnalyser();
    this.bufferLength = this.analyser.fftSize;
    this.dataArray = new Float32Array(this.bufferLength);

    this.smoothedVolume = 0;
  }

  private setAnalyser() {
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 1024;
  }

  private getRawVolume() {
    let sum = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      sum += this.dataArray[i] * this.dataArray[i];
    }

    // 소리는 +와 -로 파형을 그리며 움직인다.
    // 이 상태에서 평균을 내면 0 근처가 나오기 때문에
    // 제곱해서 절댓값처럼 만든 후 평균을 내어 "세기"를 구한다.
    return Math.sqrt(sum / this.bufferLength);
  }

  private getScaledVolume(volume: number, scale: number) {
    return volume * scale;
  }

  private getSmoothedVolume(volume: number) {
    this.smoothedVolume = Math.floor(
      this.smoothedVolume * this.SMOOTHING_FACTOR +
        volume * (1 - this.SMOOTHING_FACTOR)
    );

    return this.smoothedVolume;
  }

  protected convertDataToVolume() {
    const rawVolume = this.getRawVolume();
    const scaledVolume = this.getScaledVolume(rawVolume, 100000);
    const smoothedVolume = this.getSmoothedVolume(scaledVolume);

    return smoothedVolume;
  }

  public connectAnalyser() {
    this.source.connect(this.analyser);
  }

  public disconnectAnalyser() {
    this.source.disconnect(this.analyser);
  }

  public analyseSoundData() {
    this.analyser.getFloatTimeDomainData(this.dataArray);
  }
}
