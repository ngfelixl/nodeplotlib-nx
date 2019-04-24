import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
// import { Plot, Trace } from '@nodeplotlib/nodeplotlib';
// import { plots } from '@nodeplotlib/nodeplotlib';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class PlotsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: Server;

  @SubscribeMessage('ids')
  handleEvent(client: Socket, payload: any): Observable<string[]> {
    // return plots.getIds();
    return of([]);
  }

  // @SubscribeMessage('connection')
  handleConnection(client: Socket) {
    console.log('Connection++');
  }

  handleDisconnect(client: Socket) {
    console.log('Connection--');
  }

  // @WebSocketServer()
  // server: Server;

  afterInit() {
    console.log('Gateway initialized');
  }

  /* @SubscribeMessage('plots')
  handlePlots(client: Socket, payload: any): Observable<Entities<Plot>> {
    return plots.getEntities().pipe(
      pluck('stream$')
    );
  } */
}
