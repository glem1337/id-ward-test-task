import './assets/style.scss';

import app from './app';

const currentScript = document.currentScript;
const isRunning = currentScript.attributes.isRunning?.value === 'true';

if (isRunning) {
  app();
}
