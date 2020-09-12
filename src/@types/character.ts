interface ICharacterPosition {
  x: number;
  y: number;
}

export default interface ICharacter {
  position: ICharacterPosition;
  isCollided: boolean;
  notify: (volume: number) => void;
}
