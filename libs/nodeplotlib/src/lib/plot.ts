import { stack } from './stack';
import { Layout, Trace } from '@nodeplotlib/interfaces';
import { plot$ } from '@nodeplotlib/shared-data';
import { Observable } from 'rxjs';

export function plot(data?: Observable<Trace[]> | Trace[], layout?: Layout) {
  if (data) {
    stack(data, layout);
  }

  plot$.next();
}