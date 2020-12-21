import Popup from './popup';
import {SECOND} from '../constants/time';

export default class SettingPopup extends Popup {
  private initialTimer: number;
  private timer: number;
  private volumes: number[];
  private maxVolume: number;
  private timerId: number;
  private settingStartBtnElement: HTMLElement;
  private redoSaveBtnWrapperElement: HTMLElement;
  private volumeElement: HTMLElement;
  private timerElement: HTMLElement;
  private maxVolumeElement: HTMLElement;
  
  constructor(popupId: string, wrapperId: string, timer: number) {
    super(popupId, wrapperId);

    this.volumeElement = document.getElementById('volume');
    this.timerElement = document.getElementById('timer');
    this.maxVolumeElement = document.getElementById('max-volume');
    this.settingStartBtnElement = document.getElementById('setting-start-btn');
    this.redoSaveBtnWrapperElement = document.getElementById('redo-save-btn-wrapper');
    this.initialTimer = timer;
    this.timer = timer;
    this.volumes = [];
    this.maxVolume = 0;
  }

  public startTimer(
    stoppedAfter: () => void
  ) {
    this.renderTimerText(this.timer);

    // @ts-ignore
    this.timerId = setInterval(() => {
      this.timer -= 1;

      this.renderTimerText(this.timer);

      if (this.timer <= 0) {
        this.stopTimer();
        this.calulateMaxVolume();
        this.renderResult();
        stoppedAfter();
      }
    }, 1 * SECOND);
  }

  public hideSettingStartBtn() {
    this.settingStartBtnElement.style.display = 'none';
  }

  public hideRedoSaveBtnWrapper() {
    this.redoSaveBtnWrapperElement.style.display = 'none';
  }

  public showRedoSaveBtnWrapper() {
    this.redoSaveBtnWrapperElement.style.display = 'block';
  }

  private stopTimer() {
    clearInterval(this.timerId);
  }

  private renderTimerText(timer: number) {
    this.timerElement.innerText = timer.toString();
  }

  private renderResult() {
    this.maxVolumeElement.innerText = `MAX Volume: ${this.maxVolume.toLocaleString()}`;
  }

  private calulateMaxVolume() {
    this.maxVolume = Math.max(...this.volumes);
  }

  public notify(volume: number) {
    this.volumes.push(volume);
    this.volumeElement.innerText = volume.toLocaleString();
  }

  public reset() {
    this.timer = this.initialTimer;
    this.volumes = [];
    this.timerElement.innerText = '';
    this.maxVolumeElement.innerText = '';
    this.maxVolume = 0;
  }
  
  public saveMaxVolume() {
    localStorage.setItem('audio-flappy-bird-max-volume', this.maxVolume.toString());
  }
}
