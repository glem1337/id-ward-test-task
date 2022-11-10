import { disableBody, closeModal } from '../createModal';

describe('createModal()', () => {
  it('disableBody() should sets overflow: hidden for html and body tags', () => {
    expect(document.documentElement.style.overflowY).not.toBe('hidden');
    expect(document.body.style.overflowY).not.toBe('hidden');

    disableBody();

    expect(document.documentElement.style.overflowY).toBe('hidden');
    expect(document.body.style.overflowY).toBe('hidden');
  });

  describe('closeModal()', () => {
    const mockedModalRoot = { remove: jest.fn() };

    beforeEach(() => {
      disableBody();
      closeModal(mockedModalRoot);
    });

    it('should removes overflow: hidden for html and body tags', () => {
      expect(document.documentElement.style.overflowY).toBe('');
      expect(document.body.style.overflowY).toBe('');
    });

    it('should calls modal.remove() method', () => {
      expect(mockedModalRoot.remove).toHaveBeenCalled();
    });
  });
});
