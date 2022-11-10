import createModal from './createModal';

/**
 * Create triangle
 */
const createTriangle = () => {
  const triangle = document.createElement('div');

  triangle.classList.add('plugin-triangle');

  triangle.onclick = createModal;

  document.body.appendChild(triangle);

  return triangle;
};

export default createTriangle;
