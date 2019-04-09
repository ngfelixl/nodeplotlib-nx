import { PagesAction, PagesActionTypes } from './pages.actions';

export const PAGES_FEATURE_KEY = 'pages';

/**
 * Interface for the 'Pages' data used in
 *  - PagesState, and
 *  - pagesReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface PagesState {
  list: Entity[]; // list of Pages; analogous to a sql normalized table
  selectedId?: string | number; // which Pages record has been selected
  loaded: boolean; // has the Pages list been loaded
  error?: any; // last none error (if any)
}

export interface PagesPartialState {
  readonly [PAGES_FEATURE_KEY]: PagesState;
}

export const initialState: PagesState = {
  list: [],
  loaded: false
};

export function pagesReducer(
  state: PagesState = initialState,
  action: PagesAction
): PagesState {
  switch (action.type) {
    case PagesActionTypes.PagesLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
