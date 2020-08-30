export default async function checkPermission(): Promise<PermissionState> {
  const {state} = await window.navigator.permissions.query({
    name: 'microphone'
  });

  return state;
}
