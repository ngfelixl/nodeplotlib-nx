import { PagesLoaded } from './pages.actions';
import {
  PagesState,
  Entity,
  initialState,
  pagesReducer
} from './pages.reducer';

describe('Pages Reducer', () => {
  const getPagesId = it => it['id'];
  let createPages;

  beforeEach(() => {
    createPages = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Pages actions ', () => {
    it('should return set the list of known Pages', () => {
      const pagess = [createPages('PRODUCT-AAA'), createPages('PRODUCT-zzz')];
      const action = new PagesLoaded(pagess);
      const result: PagesState = pagesReducer(initialState, action);
      const selId: string = getPagesId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = pagesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
