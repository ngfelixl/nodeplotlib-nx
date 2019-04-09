import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { PagesEffects } from './pages.effects';
import { LoadPages, PagesLoaded } from './pages.actions';

describe('PagesEffects', () => {
  let actions: Observable<any>;
  let effects: PagesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        PagesEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(PagesEffects);
  });

  describe('loadPages$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadPages() });
      expect(effects.loadPages$).toBeObservable(
        hot('-a-|', { a: new PagesLoaded([]) })
      );
    });
  });
});
