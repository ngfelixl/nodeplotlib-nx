import { Store } from 'reactive-entity-store';
import { Plot } from '@nodeplotlib/interfaces';
import { Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

export const plots = new Store<Plot>();

export const bootstrapServer$ = new Subject<boolean>();
