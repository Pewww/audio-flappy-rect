export default async function checkPermission() {
  const {state} = await window.navigator.permissions.query({
    name: 'microphone'
  });

  return state;
}
