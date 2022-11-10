import createTriangle from '../createTriangle';

describe('createTriangle()', () => {
  const mockedTriangle = {
    classList: {
      add: jest.fn(),
    },
  };
  const mockedBody = {
    appendChild: jest.fn(),
  };

  Object.defineProperty(document, 'createElement', { value: jest.fn(() => mockedTriangle) });
  Object.defineProperty(document, 'body', {
    value: mockedBody,
  });

  it('matches snapshot', () => {
    expect(createTriangle()).toMatchSnapshot();
  });

  it('should creates triangle', () => {
    createTriangle();

    expect(document.createElement).toHaveBeenCalledWith('div');
    expect(mockedTriangle.classList.add).toHaveBeenCalledWith('plugin-triangle');
    expect(mockedBody.appendChild).toHaveBeenCalledWith(mockedTriangle);
  });
});
