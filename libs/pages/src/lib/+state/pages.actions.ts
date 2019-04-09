import { Action } from '@ngrx/store';
import { Entity } from './pages.reducer';

export enum PagesActionTypes {
  LoadPages = '[Pages] Load Pages',
  PagesLoaded = '[Pages] Pages Loaded',
  PagesLoadError = '[Pages] Pages Load Error'
}

export class LoadPages implements Action {
  readonly type = PagesActionTypes.LoadPages;
}

export class PagesLoadError implements Action {
  readonly type = PagesActionTypes.PagesLoadError;
  constructor(public payload: any) {}
}

export class PagesLoaded implements Action {
  readonly type = PagesActionTypes.PagesLoaded;
  constructor(public payload: Entity[]) {}
}

export type PagesAction = LoadPages | PagesLoaded | PagesLoadError;

export const fromPagesActions = {
  LoadPages,
  PagesLoaded,
  PagesLoadError
};
