import { Subject, Observable } from 'rxjs';
import { scan, map, pluck, share } from 'rxjs/operators';
import { createUniqueId } from './create-unique-id';

interface Action<T = any> {
  type: string;
  payload?: T;
}

export interface Update<T = any> {
  id: string;
  payload: Partial<T>;
}

interface EntityStore<T = any> {
  entities: {[id: string]: T};
  ids: string[];
}

/**
 * Reactive crud store
 * 
 * This store targets the creation of a very simple store
 * to keep your entities in. It provides modification functions
 * for adding, adding all, removing one by id, remove all,
 * update one.
 * 
 * The read functions return observables to read the stored
 * entities in an object or array way. Also you can get a
 * single entity by an id.
 *
 * ## Example
 *
 * ```ts
 * const numberStore = new Store<number>();
 * numberStore.getAll().subscribe(console.log);
 * numberStore.add(8);
 * numberStore.add(3);
 * numberStore.removeAll();
 * // logs ---> [8] ---> [8, 3] ---> []
 * ```
 */
export class Store<T> {
  private store$: Observable<EntityStore<T>>;
  private actions$ = new Subject<Action>();
  private entities$: Observable<{[id: string]: T}>;

  constructor() {
    this.store$ = this.createStore();
    this.entities$ = this.store$.pipe(pluck('entities'));
  }

  private createStore(): Observable<EntityStore<T>> {
    return this.actions$.pipe(
      scan((store: EntityStore<T>, action: Action) => {
        switch(action.type) {
          case 'add': return addOne<T>(store, action.payload);
          case 'addAll': return addAll<T>(action.payload);
          case 'update': return updateOne<T>(store, action.payload);
          case 'remove': return removeOne<T>(store, action.payload);
          case 'removeAll': return removeAll<T>();
        }
      }, {entities: {}, ids: []}),
      share()
    );
  }

  add(entity: T): void { this.actions$.next({type: 'add', payload: entity}); }
  addAll(entities: T[]): void { this.actions$.next({type: 'addAll', payload: entities}); }
  update(changes: Update): void { this.actions$.next({type: 'update', payload: changes}); }
  remove(id: string): void { this.actions$.next({type: 'remove', payload: id}); }
  removeAll(): void { this.actions$.next({type: 'removeAll'}); }

  /**
   * Get one entity filtered by id
   * @param id 
   */
  getOne(id: string): Observable<T> {
    return this.entities$.pipe(pluck(id));
  }

  /**
   * Get all entities in an array including the id property
   */
  getAll(): Observable<T[]> {
    return this.entities$.pipe(map(entities => {
      return Object.entries(entities).map(([id, value]: [string, T]) => ({id, ...value}))
    }));
  }

  /**
   * Get all entities as an object with keys
   */
  getEntities(): Observable<{[id: string]: T}> {
    return this.entities$;
  }
}

function addOne<T>(store: EntityStore<T>, payload: T): EntityStore<T> {
  if (!payload) {
    return store;
  }

  const id = payload['id'] || createUniqueId(store.entities);
  return {entities: {...store.entities, [id]: payload}, ids: [...store.ids, id]};
}
function addAll<T>(payload: T[]): EntityStore<T> {
  return payload.reduce((store: EntityStore<T>, entity: T) => {
    const id = entity['id'] || createUniqueId(store.entities);
    store.entities[id] = entity;
    store.ids.push(id);
    return store;
  }, {entities: {}, ids: []});
}
function removeOne<T>(store: EntityStore<T>, id: string): EntityStore<T> {
  if (store.entities[id]) {
    delete store.entities[id];
    store.ids.splice(store.ids.indexOf(id), 1);
  }
  return store;
}
function removeAll<T>(): EntityStore<T> {
  return {entities: {}, ids: []};
}
function updateOne<T>(store: EntityStore<T>, update: Update) {
  const entity = store.entities[update.id];
  store.entities[update.id] = {...entity, ...update.payload};
  return store;
}
