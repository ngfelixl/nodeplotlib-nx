import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { PagesPartialState } from './pages.reducer';
import { pagesQuery } from './pages.selectors';
import { LoadPages } from './pages.actions';

@Injectable()
export class PagesFacade {
  loaded$ = this.store.pipe(select(pagesQuery.getLoaded));
  allPages$ = this.store.pipe(select(pagesQuery.getAllPages));
  selectedPages$ = this.store.pipe(select(pagesQuery.getSelectedPages));

  constructor(private store: Store<PagesPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadPages());
  }
}
