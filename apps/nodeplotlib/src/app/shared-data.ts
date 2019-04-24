import { Store } from 'reactive-entity-store';
import { Plot } from '@nodeplotlib/interfaces';
import { Subject } from 'rxjs';

export const plots = new Store<Plot>();

export const bootstrapServer$ = new Subject<boolean>();
