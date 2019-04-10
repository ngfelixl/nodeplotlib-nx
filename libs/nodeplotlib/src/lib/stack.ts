import { plotStack } from '@nodeplotlib/shared-data';
import { Observable, of as observableOf } from 'rxjs';
import { Trace, Layout } from '@nodeplotlib/interfaces';

export function stack(data: Observable<Trace[]> | Trace[], layout?: Layout) {
  let stream$: Observable<Trace[]>;
  
  if (!(data instanceof Observable)) {
    stream$ = observableOf(data);
  } else {
    stream$ = data;
  }

  plotStack.add({stream$, layout});
}