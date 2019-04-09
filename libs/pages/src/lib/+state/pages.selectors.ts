import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PAGES_FEATURE_KEY, PagesState } from './pages.reducer';

// Lookup the 'Pages' feature state managed by NgRx
const getPagesState = createFeatureSelector<PagesState>(PAGES_FEATURE_KEY);

const getLoaded = createSelector(
  getPagesState,
  (state: PagesState) => state.loaded
);
const getError = createSelector(
  getPagesState,
  (state: PagesState) => state.error
);

const getAllPages = createSelector(
  getPagesState,
  getLoaded,
  (state: PagesState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getPagesState,
  (state: PagesState) => state.selectedId
);
const getSelectedPages = createSelector(
  getAllPages,
  getSelectedId,
  (pages, id) => {
    const result = pages.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const pagesQuery = {
  getLoaded,
  getError,
  getAllPages,
  getSelectedPages
};
