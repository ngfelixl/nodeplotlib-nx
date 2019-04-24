import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  connected$: Observable<boolean>;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.connected$ = this.socketService.connected$;
  }
}
