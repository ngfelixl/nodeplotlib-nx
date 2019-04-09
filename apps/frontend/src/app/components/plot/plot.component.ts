import { Component, ElementRef, AfterViewInit, Input, ChangeDetectionStrategy, HostListener, OnDestroy } from '@angular/core';
import { newPlot, relayout } from 'plotly.js';
import { Trace } from '@nodeplotlib/interfaces';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, throttleTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlotComponent implements AfterViewInit, OnDestroy {
  @Input() traces: Trace[];
  onDestroy$ = new Subject();
  onResize$ = fromEvent(window, 'resize').pipe(
    debounceTime(100),
    takeUntil(this.onDestroy$)
  );

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit() {
    newPlot(this.elementRef.nativeElement, this.traces, {});

    this.onResize$.subscribe(() => {
      const update = {
        width: this.elementRef.nativeElement.clientWidth
      };
      relayout(this.elementRef.nativeElement, update);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
