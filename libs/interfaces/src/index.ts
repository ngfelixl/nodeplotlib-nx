import { Observable, Subscription } from 'rxjs';
import { Layout as PlotlyLayout, PlotData as PlotlyData } from 'plotly.js';

export type Trace = Partial<PlotlyData>;
export type Layout = Partial<PlotlyLayout>;

export interface Plot {
  layout?: Layout;
  stream$: Observable<Trace[]>;
}

export interface Message {
  id: string;
  traces: Trace[];
  layout?: Layout;
}

export interface PageNotification {
  subscribe?: string;
  unsubscribe?: string;
}
