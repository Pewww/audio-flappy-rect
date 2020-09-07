export async function checkPermission(): Promise<PermissionState> {
  const {state} = await window.navigator.permissions.query({
    name: 'microphone'
  });

  return state;
}

export async function getPermission() {
  const stream = await window.navigator.mediaDevices.getUserMedia({
    audio: true
  });

  return stream;
}
