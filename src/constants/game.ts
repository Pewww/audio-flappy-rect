export type TGameStatus = 'WAITING' | 'RUNNING' | 'OVER';

export enum GAME_STATUS {
  WAITING = "WAITING",
  RUNNING = "RUNNING",
  OVER = "OVER"
};

export const DEFAULT_MAX_VOLUME = 20000;

export const MAP_SIZE = {
  width: 480,
  height: 640
};
