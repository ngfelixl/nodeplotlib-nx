import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Plot, Trace } from '@nodeplotlib/interfaces';
import { plots } from '@nodeplotlib/shared-data';
import { Socket, Server } from 'socket.io';
import { concatMap, switchMap, mergeMap, pluck } from 'rxjs/operators';
import { plot, PlotData } from 'plotly.js';
import { Entities } from 'reactive-entity-store/lib/interfaces';
import { WSASERVICE_NOT_FOUND } from 'constants';

@WebSocketGateway()
export class PagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: Server;

  @SubscribeMessage('ids')
  handleEvent(client: Socket, payload: any): Observable<string[]> {
    return plots.getIds();
  }

  // @SubscribeMessage('connection')
  handleConnection(client: Socket) {
    console.log('Connection++');
  }

  handleDisconnect(client: Socket) {
    console.log('Connection--');
  }

  @WebSocketServer()
  server: Server;

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
