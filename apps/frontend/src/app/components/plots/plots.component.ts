import { Component, OnInit } from '@angular/core';
import { Trace } from '@nodeplotlib/interfaces';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css']
})
export class PlotsComponent implements OnInit {
  plots: Trace[][] = [
    [{x: [1, 2, 3, 4], y: [2, 3, 2, 10], type: 'scatter'}],
    [{x: [1, 2], y: [2, 3], type: 'scatter'}]
  ];

  constructor() { }

  ngOnInit() {
  }

}
