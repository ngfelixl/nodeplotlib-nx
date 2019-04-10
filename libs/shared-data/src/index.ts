import { Store } from '@nodeplotlib/reactive-entity-store';
import { PlotStates, PlotData } from '@nodeplotlib/interfaces';
import { Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

export const pages = new Store<string>();
export const plotStack = new Store<PlotData>();
export const plotStates = new Store<PlotStates>();

export const bootstrapServer$ = new Subject<boolean>();
export const plot$ = new Subject();
