import checkPermission from './lib/checkPermission';

async function tts() {
  const tt = await checkPermission();

  console.log('check status');
  console.dir(tt);
}

tts();

console.log('Right?');
