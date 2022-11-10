import { MODAL_DESCRIPTION, USER_CHOICE_CONFIG, USER_CHOICE_KEY } from './constants';

import { addCollect, removeCollect } from './integration';

/**
 * Disable body scrolling
 */
export const disableBody = () => {
  document.documentElement.style.overflowY = 'hidden';
  document.body.style.overflowY = 'hidden';
};

/**
 * Close modal
 * @param modalRoot {HTMLElement}
 */
export const closeModal = (modalRoot) => {
  document.documentElement.style.overflowY = '';
  document.body.style.overflowY = '';

  modalRoot.remove();
};

/**
 * On reject button click handler
 * @param modalRoot {HTMLElement}
 * @return {(function(): void)|*}
 */
const onRejectHandler = (modalRoot) => () => {
  closeModal(modalRoot);

  localStorage.setItem(USER_CHOICE_KEY, USER_CHOICE_CONFIG.REJECTED);

  removeCollect();
};

/**
 * On accept button click handler
 * @param modalRoot {HTMLElement}
 * @return {(function(): void)|*}
 */
const onAcceptHandler = (modalRoot) => () => {
  closeModal(modalRoot);

  localStorage.setItem(USER_CHOICE_KEY, USER_CHOICE_CONFIG.ACCEPTED);

  addCollect();
};

/**
 * Create modal
 */
const createModal = () => {
  disableBody();

  // create the modal root div
  const modalRoot = document.createElement('div');
  modalRoot.classList.add('plugin-modal');

  // create the modal mask
  const mask = document.createElement('div');
  mask.classList.add('plugin-modal__mask');

  // create the inner modal wrapper
  const wrap = document.createElement('div');
  wrap.classList.add('plugin-modal__wrap');

  // create the modal inner
  const modal = document.createElement('div');
  modal.classList.add('plugin-modal__inner');

  // create the modal content
  const content = document.createElement('div');
  content.classList.add('plugin-modal__content');
  content.innerHTML = `<div class="w3-margin-bottom">${MODAL_DESCRIPTION}</div>`;

  // create the accept button
  const acceptBtn = document.createElement('button');
  acceptBtn.className = 'w3-button w3-black w3-padding-large w3-large';
  acceptBtn.innerHTML = 'Accept';
  acceptBtn.onclick = onAcceptHandler(modalRoot);

  // create the reject button
  const rejectBtn = document.createElement('button');
  rejectBtn.className = 'w3-button w3-red w3-padding-large w3-large w3-margin-left';
  rejectBtn.innerHTML = 'Reject';
  rejectBtn.onclick = onRejectHandler(modalRoot);

  // render the modal on DOM
  modalRoot.appendChild(mask);
  modalRoot.appendChild(wrap);
  wrap.appendChild(modal);
  modal.appendChild(content);
  content.appendChild(acceptBtn);
  content.appendChild(rejectBtn);
  document.body.appendChild(modalRoot);
};

export default createModal;
