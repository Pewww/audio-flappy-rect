import {MediaRecorder} from '../@types/mediaRecorder';

export default class Record {
  mediaRecorder: MediaRecorder;
  audioChunks: Blob[];

  constructor(stream: MediaStream) {
    this.mediaRecorder = new window.MediaRecorder(stream);
    this.audioChunks = [];

    this.onWatchRecording();
    this.onStopWatchingRecording();
  }

  public startRecording() {
    this.mediaRecorder.start();
  }

  public stopRecording() {
    this.mediaRecorder.stop();
  }

  private onWatchRecording() {
    this.mediaRecorder.addEventListener('dataavailable', event => {
      this.audioChunks.push(event.data);
    });
  }

  private onStopWatchingRecording() {
    // 임시 로직
    this.mediaRecorder.addEventListener('stop', () => {
      const audioBlob = new Blob(this.audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    });
  }
}
