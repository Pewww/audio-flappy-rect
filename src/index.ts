import {getPermission, checkPermission} from './lib/permission';
import {PERMISSION_STATUS} from './constants/permission';
import Game from './models/game';
import {GAME_STATUS, MAP_SIZE} from './constants/game';

(async function main() {
  const startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', handleClickStartBtn);
})();

async function handleClickStartBtn() {
  const permissionState = await checkPermission();
  
  switch(permissionState) {
    case PERMISSION_STATUS.GRANTED: {
      toggleStartCoverVisibility('exiting', 'entering');
      toggleScorePartVisibility('entering', 'exiting');
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

function toggleStartCoverVisibility(cnToAdd: string, cnToRemove?: string) {
  const startCoverElement = document.getElementsByClassName('start-cover')[0];
  startCoverElement.classList.remove(cnToRemove);
  startCoverElement.classList.add(cnToAdd);
}

function toggleScorePartVisibility(cnToAdd: string, cnToRemove?: string) {
  const scorePartElement = document.getElementsByClassName('score-part')[0];
  scorePartElement.classList.remove(cnToRemove);
  scorePartElement.classList.add(cnToAdd);
}

async function startGame() {
  const stream = await getPermission();
  const {
    width: mapWidth,
    height: mapHeight
  } = MAP_SIZE;

  const canvas = document.getElementById('map') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  canvas.width = mapWidth;
  canvas.height = mapHeight;

  let requestId = 0;
  const game = new Game(mapWidth, mapHeight, stream);

  game.start();

  (function gameLoop() {
    requestId = window.requestAnimationFrame(gameLoop);

    if (game.status === GAME_STATUS.OVER) {
      window.cancelAnimationFrame(requestId);
      toggleStartCoverVisibility('entering', 'exiting');
    } else {
      ctx.clearRect(0, 0, mapWidth, mapHeight);

      game.draw(ctx);
      game.update();
    }
  })();
}
