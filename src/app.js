import { USER_CHOICE_CONFIG, USER_CHOICE_KEY } from './constants';

import createTriangle from './createTriangle';
import { addCollect } from './integration';

const app = () => {
  createTriangle();

  if (localStorage.getItem(USER_CHOICE_KEY) === USER_CHOICE_CONFIG.ACCEPTED) {
    addCollect();
  }
};

export default app;
