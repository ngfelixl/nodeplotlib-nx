import { Component, OnInit } from '@angular/core';
import { PagesFacade } from '../+state/pages.facade';
import { Observable } from 'rxjs';


@Component({
  selector: 'pages-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  pages$: Observable<string[]>;

  constructor(private pagesFacade: PagesFacade) { }

  ngOnInit() {
    this.pages$ = this.pagesFacade.allPages$;
  }

}
