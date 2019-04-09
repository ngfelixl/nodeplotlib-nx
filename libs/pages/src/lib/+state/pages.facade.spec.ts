import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { PagesEffects } from './pages.effects';
import { PagesFacade } from './pages.facade';

import { pagesQuery } from './pages.selectors';
import { LoadPages, PagesLoaded } from './pages.actions';
import {
  PagesState,
  Entity,
  initialState,
  pagesReducer
} from './pages.reducer';

interface TestSchema {
  pages: PagesState;
}

describe('PagesFacade', () => {
  let facade: PagesFacade;
  let store: Store<TestSchema>;
  let createPages;

  beforeEach(() => {
    createPages = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('pages', pagesReducer, { initialState }),
          EffectsModule.forFeature([PagesEffects])
        ],
        providers: [PagesFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(PagesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allPages$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allPages$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `PagesLoaded` to manually submit list for state management
     */
    it('allPages$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allPages$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new PagesLoaded([createPages('AAA'), createPages('BBB')])
        );

        list = await readFirst(facade.allPages$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
