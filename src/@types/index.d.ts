import {MediaRecorderClass} from './mediaRecorder';

declare global {
  interface Window {
    MediaRecorder: MediaRecorderClass;
  }
}
