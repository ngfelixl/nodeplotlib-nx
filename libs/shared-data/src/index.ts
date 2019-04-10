import { Store } from '@nodeplotlib/reactive-entity-store';
import { PlotStates, PlotData } from '@nodeplotlib/interfaces';

export const pages = new Store<string>();
export const plotStack = new Store<PlotData>();
export const plotStates = new Store<PlotStates>();
