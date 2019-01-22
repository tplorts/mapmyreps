import { getMillisecondsForCSSDuration, pause } from './utilities/temporal';

function getFadeDuration(loaderElement: Element) {
  const { transitionDuration } = window.getComputedStyle(loaderElement);

  return getMillisecondsForCSSDuration(transitionDuration, 1e3);
}

export default async function removeAppLoader() {
  const loaderElement = document.getElementById('pre-app-loader');

  if (!loaderElement) {
    return null;
  }

  loaderElement.classList.add('removing');

  await pause(getFadeDuration(loaderElement));

  loaderElement.remove();

  return true;
}
