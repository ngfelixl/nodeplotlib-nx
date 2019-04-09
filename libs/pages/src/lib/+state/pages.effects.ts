import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { PagesPartialState } from './pages.reducer';
import {
  LoadPages,
  PagesLoaded,
  PagesLoadError,
  PagesActionTypes
} from './pages.actions';

@Injectable()
export class PagesEffects {
  @Effect() loadPages$ = this.dataPersistence.fetch(
    PagesActionTypes.LoadPages,
    {
      run: (action: LoadPages, state: PagesPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new PagesLoaded(['Demo']);
      },

      onError: (action: LoadPages, error) => {
        console.error('Error', error);
        return new PagesLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<PagesPartialState>
  ) {}
}
