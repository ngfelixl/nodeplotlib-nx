import { stack } from './stack';
import { Layout, Trace } from '@nodeplotlib/interfaces';
import { plots } from '@nodeplotlib/shared-data';
import { Observable } from 'rxjs';

export function plot(data?: Observable<Trace[]> | Trace[], layout?: Layout) {
  if (data) {
    stack(data, layout);
  }

  // plots.next();
}