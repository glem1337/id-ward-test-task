import { USER_CHOICE_CONFIG, USER_CHOICE_KEY } from '../constants';

import createTriangle from '../createTriangle';
import { addCollect } from '../integration';

import app from '../app';

jest.mock('../createTriangle');
jest.mock('../integration');

describe('app()', () => {
  const mockedLocalStorage = (function () {
    let store = {};

    return {
      getItem(key) {
        return store[key];
      },

      setItem(key, value) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: mockedLocalStorage });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calls createTriangle()', () => {
    app();

    expect(createTriangle).toHaveBeenCalled();
  });

  it(`should calls addCollect() when localStorage.getItem(${USER_CHOICE_KEY}) returns ${USER_CHOICE_CONFIG.ACCEPTED}`, () => {
    mockedLocalStorage.setItem(USER_CHOICE_KEY, USER_CHOICE_CONFIG.ACCEPTED);

    app();

    expect(addCollect).toHaveBeenCalled();
  });

  it(`shouldn't calls addCollect() when localStorage.getItem(${USER_CHOICE_KEY}) returns ${USER_CHOICE_CONFIG.REJECTED}`, () => {
    mockedLocalStorage.setItem(USER_CHOICE_KEY, USER_CHOICE_CONFIG.REJECTED);

    app();

    expect(addCollect).not.toHaveBeenCalled();
  });
});
