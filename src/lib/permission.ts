import { PERMISSION_STATUS } from "../constants/permission";

interface HandlePermissionParams {
  onGranted: () => void;
  onPrompt: () => void;
  onDenied: () => void;
}

export async function checkPermission(): Promise<PermissionState> {
  const { state } = await window.navigator.permissions.query({
    name: "microphone",
  });

  return state;
}

export async function getPermission() {
  const stream = await window.navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  return stream;
}

export async function handlePermission({
  onGranted,
  onPrompt,
  onDenied,
}: HandlePermissionParams) {
  const permissionState = await checkPermission();

  switch (permissionState) {
    case PERMISSION_STATUS.GRANTED:
      onGranted();
      break;
    case PERMISSION_STATUS.PROMPT:
      onPrompt();
      break;
    case PERMISSION_STATUS.DENIED:
      onDenied();
      break;
    default:
      break;
  }
}
