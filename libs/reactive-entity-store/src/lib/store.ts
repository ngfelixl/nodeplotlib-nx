import { Subject, combineLatest, Observable } from 'rxjs';
import { scan, tap, map, publish, pluck, mapTo } from 'rxjs/operators';
import { createUniqueId } from './create-unique-id';

interface Task<T = any>{
  id: number;
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
 * numberStore.add$.next(8);
 * numberStore.add$.next(3);
 * numberStore.removeAll$.next();
 * // logs ---> [8] ---> [8, 3] ---> []
 * ```
 */
export class Store<T> {
  private id = 0;
  add$ = new Subject<T>();
  addAll$ = new Subject<T[]>();
  update$ = new Subject<Update>();
  remove$ = new Subject<string>();
  removeAll$ = new Subject<string>();

  private addTask$: Observable<Task<T>> = this.add$.pipe(map(payload => ({id: this.id, payload})));
  private addAllTask$: Observable<Task<T[]>> = this.addAll$.pipe(map(payload => ({id: this.id, payload})));
  private updateTask$: Observable<Task<Update>> = this.update$.pipe(map(payload => ({id: this.id, payload})));
  private removeTask$: Observable<Task<string>> = this.remove$.pipe(map(payload => ({id: this.id, payload})));
  private removeAllTask$: Observable<Task> = this.removeAll$.pipe(mapTo({id: this.id}));

  private store$ = combineLatest(
    this.addTask$,
    this.addAllTask$,
    this.updateTask$,
    this.removeTask$,
    this.removeAllTask$
  ).pipe(
    scan((store: EntityStore, [
      addTask,
      addAllTask,
      updateTask,
      removeTask,
      removeAllTask]: [Task<T>, Task<T[]>, Task<Update>, Task<string>, Task]) => {
      switch (this.id) {
        case removeTask.id: return removeOne<T>(store, removeTask.payload);
        case removeAllTask.id: return removeAll<T>();
        case updateTask.id: return updateOne<T>(store, updateTask.payload);
        case addTask.id: return addTask.payload ? addOne<T>(store, addTask.payload) : store;
        case addAllTask.id: return addAll<T>(addAllTask.payload);
      }
    }, {entities: {}, ids: []}),
    tap(() => this.id++),
    publish()
  );

  private entities$ = this.store$.pipe(pluck('entities'), publish());

  /**
   * Get one entity filtered by id
   * @param id 
   */
  getOne(id: string): Observable<T> {
    return this.entities$.pipe(pluck(id));
  }

  /**
   * Get all entities in an array
   */
  getAll(): Observable<T[]> {
    return this.entities$.pipe(map(entities => {
      return Object.entries(entities).map(([id, value]: [string, T]) => ({id, ...value}))
    }));
  }

  /**
   * Get all entities as an object
   */
  getEntities(): Observable<{[id: string]: T}> {
    return this.entities$;
  }
}

function addOne<T>(store: EntityStore<T>, payload: T): EntityStore<T> {
  const id = payload['id'] || createUniqueId(store.entities);
  return {entities: {...store.entities, [id]: payload}, ids: [...store.ids, id]};
}
function addAll<T>(payload: T[]): EntityStore<T> {
  return payload.reduce((accStore: EntityStore<T>, entity: T) => {
    const id = entity['id'] || createUniqueId(accStore.entities);
    return {entities: {...accStore, [id]: entity}, ids: [...accStore.ids, id]};
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
