import ICharacter from '../@types/character';

interface Subject {
  attach: (observer: ICharacter) => void;
  detach: (observer: ICharacter) => void;
  // setAnalyser: () => void;
  connectAnalyser: () => void;
  analyseData: () => void;
}

export default class AudioCtx implements Subject {
  audioCtx: AudioContext;
  source: MediaStreamAudioSourceNode;
  analyser: AnalyserNode;
  bufferLength: number;
  dataArray: Uint8Array;
  observers: ICharacter[];

  constructor(stream: MediaStream) {
    this.audioCtx = new AudioContext();
    this.source = this.audioCtx.createMediaStreamSource(stream);
    this.setAnalyser();
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.observers = [];
  }

  private setAnalyser() {
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 1024;
  }

  public attach(observer) {
    const isExist = this.observers.includes(observer);

    if (!isExist) {
      this.observers.push(observer);
    }
  }

  public detach(observer) {
    this.observers = this.observers.filter(
      _observer => observer !== _observer
    );
  }

  public connectAnalyser() {
    this.source.connect(this.analyser);
    this.analyseData();
  }

  public analyseData() {
    requestAnimationFrame(() => this.analyseData());

    this.analyser.getByteFrequencyData(this.dataArray);

    const volume = this.convertDataToVolume();

    this.observers.forEach(observer => {
      observer.notify(volume);
    });
  }

  private convertDataToVolume() {
    const volumes = this.dataArray.reduce(
      (prev, curr) => prev + curr, 0
    );
    const averageVolume = Math.floor(volumes / this.bufferLength);
    
    return averageVolume;
  }
}
