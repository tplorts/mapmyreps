import { getMillisecondsForCSSDuration, pause } from './utilities/temporal';

export default async function removeAppLoader() {
  const loaderElement = document.getElementById('pre-app-loader');

  if (!loaderElement) {
    return null;
  }

  loaderElement.classList.add('removing');

  const { transitionDuration } = window.getComputedStyle(loaderElement);

  await pause(getMillisecondsForCSSDuration(transitionDuration, 1e3));

  loaderElement.remove();

  return true;
}
