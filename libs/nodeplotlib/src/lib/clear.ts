import { plotStates } from '@nodeplotlib/shared-data';

export function clear() {
  plotStates.removeAll$.next();
}