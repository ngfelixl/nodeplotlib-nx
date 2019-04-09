import { Entity, PagesState } from './pages.reducer';
import { pagesQuery } from './pages.selectors';

describe('Pages Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPagesId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createPages = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      pages: {
        list: [
          createPages('PRODUCT-AAA'),
          createPages('PRODUCT-BBB'),
          createPages('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Pages Selectors', () => {
    it('getAllPages() should return the list of Pages', () => {
      const results = pagesQuery.getAllPages(storeState);
      const selId = getPagesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedPages() should return the selected Entity', () => {
      const result = pagesQuery.getSelectedPages(storeState);
      const selId = getPagesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = pagesQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = pagesQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
