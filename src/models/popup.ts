export default class Popup {
  private popup: HTMLElement;
  private popupWrapper: HTMLElement;

  constructor(popupId: string, wrapperId: string) {
    this.popup = document.getElementById(popupId);
    this.popupWrapper = document.getElementById(wrapperId);
  }

  public get popupElement() {
    return this.popup;
  }

  public get popupWrapperElement() {
    return this.popupWrapper;
  }

  public open() {
    this.popupWrapper.style.display = 'block';
    this.popup.style.display = 'block';
  }

  public close() {
    this.popupWrapper.style.display = 'none';
    this.popup.style.display = 'none';
  }
}
