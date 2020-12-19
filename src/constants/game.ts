export type TGameStatus = 'WAITING' | 'RUNNING' | 'OVER';

export enum GAME_STATUS {
  WAITING = "WAITING",
  RUNNING = "RUNNING",
  OVER = "OVER"
};

export const VOLUMN_CHANGE_DEGREE = 5; // 변하는 높이의 정도(폭) 조절

export const MAP_SIZE = {
  width: 480,
  height: 640
};
