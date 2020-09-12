import AudioCtx from './lib/audioCtx';
import Character from './lib/character';
import {getPermission, checkPermission} from './lib/permission';
import {PERMISSION_STATUS} from './constants/permission';

(async function main() {
  const startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', handleClickStartBtn);
})();

async function handleClickStartBtn() {
  const permissionState = await checkPermission();
  
  switch(permissionState) {
    case PERMISSION_STATUS.GRANTED: {
      await makeStartCoverInvisible();
      startGame();
      break;
    }
    case PERMISSION_STATUS.PROMPT: {
      await getPermission();
      window.location.reload();
    }
    case PERMISSION_STATUS.DENIED: {
      alert('마이크 액세스 권한이 차단된 상태입니다.');
      break;
    }
    default:
      break;
  }
}

async function makeStartCoverInvisible() {
  const startCoverElement = document.getElementsByClassName('start-cover')[0];
  startCoverElement.classList.add('exiting');
}

async function startGame() {
  const stream = await getPermission();

  const audioCtx = new AudioCtx(stream);
  const character = new Character();

  audioCtx.attach(character); // Attatch observer.
}
