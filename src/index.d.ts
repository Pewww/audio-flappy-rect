import MediaRecorder from './@types/mediaRecorder';

export {};

declare global {
  interface Window {
    MediaRecorder: MediaRecorder;
  }
}
