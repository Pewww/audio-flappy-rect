import {getMapSize} from './lib/map';
import {getPermission, checkPermission} from './lib/permission';
import {PERMISSION_STATUS} from './constants/permission';
import Game from './models/game';

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
      break;
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

  const {
    width,
    height
  } = getMapSize();

  const canvas = document.getElementById('map') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  const game = new Game(width, height, stream);

  game.start();

  (function gameLoop() {
    ctx.clearRect(0, 0, width, height);

    game.update(ctx); // update랑 draw가 따로 있네 draw에 ctx 넘기는 중
    
    window.requestAnimationFrame(gameLoop);
  })();
}
