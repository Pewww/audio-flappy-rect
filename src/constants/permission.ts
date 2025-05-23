// 사용자에게 마이크 액세스 권한이 부여됨
const GRANTED = 'granted';
// 사용자에게 마이크 엑세스 권한이 부여되지 않았고, getUserMedia 호출 시 메시지 표시
const PROMPT = 'prompt';
// 마이크 액세스가 차단되어 이용할 수 없음
const DENIED = 'denied';

export const PERMISSION_STATUS = {
  GRANTED,
  PROMPT,
  DENIED
};
