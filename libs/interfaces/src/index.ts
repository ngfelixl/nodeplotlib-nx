import { Observable, Subscription } from 'rxjs';
import { Layout as PlotlyLayout, PlotData as PlotlyData } from 'plotly.js';

export type Trace = Partial<PlotlyData>;
export type Layout = Partial<PlotlyLayout>;

export interface PlotData {
  layout?: Layout;
  stream$: Observable<Trace[]>;
}

export interface PlotStates {
  [id: string]: PlotState;
}

export interface PlotState {
  plotData: PlotData;
  opened: boolean;
  pending: boolean;
}

export interface Pages {
  [id: string]: Page;
}

export interface Page {
  websocket: any;
  subscription: Subscription;
  plots: PlotStates;
}

export interface State {
  [id: number]: Page;
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
