const SCRIPT_ID = 'collect-script';

/**
 * Get user id
 * @return {Promise<*>}
 */
export const getUserId = async () => {
  const resp = await fetch('https://www.uuidtools.com/api/generate/v4');
  const usersIds = await resp.json();

  return usersIds[0];
};

/**
 * Remove collect.js from DOM
 */
export const removeCollect = () => {
  const script = document.getElementById(SCRIPT_ID);

  if (!script) {
    return;
  }

  script.remove();
};

/**
 * Add collect.js into DOM
 */
export const addCollect = async () => {
  if (document.getElementById(SCRIPT_ID)) {
    return;
  }

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = 'collect.js';

  const userId = await getUserId();
  script.setAttribute('user', userId);

  document.body.appendChild(script);
};
