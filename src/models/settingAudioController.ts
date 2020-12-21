import AudioController from './audioController';
import SettingPopup from './settingPopup';

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
