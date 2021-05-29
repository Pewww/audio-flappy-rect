import AudioController from './AudioController';
import {SettingPopup} from '../popups';

export default class SettingAudioController extends AudioController {
  private settingPopup: SettingPopup;

  constructor(settingPopup: SettingPopup, stream: MediaStream) {
    super(stream);
    this.settingPopup = settingPopup;
  }

  public notifyAnalysedDataToCharacter() {
    this.analyseFrequencyData();

    const volume = this.convertDataToVolume();
    this.settingPopup.notify(volume);
  }
}
