import { Component, ElementRef, AfterViewInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { newPlot } from 'plotly.js';
import { Trace } from '@nodeplotlib/interfaces';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlotComponent implements AfterViewInit {
  @Input() traces: Trace[];

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    newPlot(this.elementRef.nativeElement, this.traces, {});
  }
}
