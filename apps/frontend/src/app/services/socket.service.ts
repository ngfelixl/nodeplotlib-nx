import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Socket } from 'socket.io';

import * as socketIo from 'socket.io-client';
import { Observable, Observer } from 'rxjs';
import { Message } from '@nodeplotlib/interfaces';

export enum SocketEvents {
  connect = 'connect',
  disconnect = 'disconnect'
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  connected$: Observable<boolean>;

  constructor() {
    this.socket = socketIo(environment.socketUrl);

    this.connected$ = new Observable((observer: Observer<boolean>) => {
      this.socket.on('connect', () => { observer.next(true); });
      this.socket.on('disconnect', () => { observer.next(false); });
    });
  }

  send(event: string, message: Message) {
    this.socket.emit(event, message);
  }

  onMessage(): Observable<Message> {
    return new Observable<any>((observer: Observer<any>) => {
      this.socket.on('message', (data) => observer.next(data));
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
