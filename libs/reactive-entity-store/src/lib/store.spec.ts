import { Store } from "./store";
import { TestScheduler } from 'rxjs/testing';
import { Subscription } from 'rxjs';

interface Test {
  id?: string;
  attribute: string;
}

const scheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('Store', () => {
  let store: Store<Test>;
  const subscription = new Subscription();

  beforeEach(() => {
    store = new Store<Test>();
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should add an element', (done) => {
    subscription.add(store.getAll().subscribe(
      (data) => {
        expect(data).toEqual([{id: '1', attribute: '2'}]);
        done();
      }
    ));

    store.add$.next({id: '1', attribute: '2'});
  });

  afterEach(() => {
    subscription.unsubscribe();
  });
});