import {MediaRecorderClass} from './@types/mediaRecorder';

export {};

declare global {
  interface Window {
    MediaRecorder: MediaRecorderClass;
  }
}
