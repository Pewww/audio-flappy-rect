import {getPermission, handlePermission} from './lib/permission';
import Game from './models/game';
import SettingPopup from './models/settingPopup';
import {GAME_STATUS, MAP_SIZE} from './constants/game';
import SettingAudioController from './models/settingAudioController';

(async function main() {
  const startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', handleClickStartBtn);

  const settingBtn = document.getElementsByClassName('setting-btn')[0];
  settingBtn.addEventListener('click', handleClickSettingBtn);
})();

// 게임 관련
function toggleElementVisibility(
  className: string,
  classNameToAdd: string,
  classNameToRemove?: string
) {
  const element = document.getElementsByClassName(className)[0];
  element.classList.remove(classNameToRemove);
  element.classList.add(classNameToAdd);
};

async function handleClickStartBtn() {
  await handlePermission({
    onGranted: () => {
      toggleElementVisibility('start-cover', 'exiting', 'entering');
      toggleElementVisibility('setting-btn', 'exiting', 'entering');
      toggleElementVisibility('score-part', 'entering', 'exiting');
    
      startGame();
    },
    onPrompt: async () => {
      await getPermission();
      window.location.reload();
    },
    onDenied: () => {
      alert('마이크 액세스 권한이 차단된 상태입니다.');
    }
  });
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

      toggleElementVisibility('start-cover', 'entering', 'exiting');
      toggleElementVisibility('setting-btn', 'entering', 'exiting');
    } else {
      ctx.clearRect(0, 0, mapWidth, mapHeight);

      game.draw(ctx);
      game.update();
    }
  })();
}

// 세팅 관련
async function handleClickSettingBtn() {
  await handlePermission({
    onGranted: async () => {
      const stream = await getPermission();

      const settingStartBtn = document.getElementById('setting-start-btn');
      const redoBtn = document.getElementById('redo-btn');
      const saveBtn = document.getElementById('save-btn');

      const settingPopup = new SettingPopup('popup', 'popup-wrapper', 5);
      const settingAudioController = new SettingAudioController(settingPopup, stream);

      settingPopup.open();

      settingStartBtn.addEventListener('click', () => {
        settingPopup.hideSettingStartBtn();
        handleClickSettingStartBtn(settingPopup, settingAudioController);
      });

      redoBtn.addEventListener('click', () => {
        settingPopup.reset();
        settingPopup.hideRedoSaveBtnWrapper();
        handleClickSettingStartBtn(settingPopup, settingAudioController);
      });

      saveBtn.addEventListener('click', () => {
        settingPopup.saveMaxVolume();
        window.location.reload();
      });
    },
    onPrompt: async () => {
      await getPermission();
      window.location.reload();
    },
    onDenied: () => {
      alert('마이크 액세스 권한이 차단된 상태입니다.');
    }
  });
}

function handleClickSettingStartBtn(settingPopup: SettingPopup, settingAudioController: SettingAudioController) {
  let requestId = 0;

  settingAudioController.connectAnalyser();

  settingPopup.startTimer(() => {
    window.cancelAnimationFrame(requestId);

    settingAudioController.disconnectAnalyser();
    settingPopup.showRedoSaveBtnWrapper();
  });

  (function settingLoop() {
    requestId = window.requestAnimationFrame(settingLoop);
    settingAudioController.notifyAnalysedDataToCharacter();
  })();
}
