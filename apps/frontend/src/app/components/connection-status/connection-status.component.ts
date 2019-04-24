import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-connection-status',
  template: `
  <button mat-icon-button [class.connected]="connected" [matTooltip]="connected ? 'Connected' : 'Disconnected'"><mat-icon>fiber_manual_record</mat-icon></button>
  `,
  styles: [`
    button { color: red; cursor: default; }
    mat-icon { font-size: 12px; }
    button.connected { color: green; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectionStatusComponent {
  @Input() connected: boolean;
}
