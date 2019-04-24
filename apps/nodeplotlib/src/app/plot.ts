import { stack } from './stack';
import { Layout, Trace } from './interfaces';
import { Observable } from 'rxjs';
import * as open from 'open';
import {bootstrap} from '@nodeplotlib/server';

export function plot(data?: Observable<Trace[]> | Trace[], layout?: Layout) {
  if (data) {
    stack(data, layout);
  }

  bootstrap();
  open('http://localhost:3333/');
  // plots.next();
}