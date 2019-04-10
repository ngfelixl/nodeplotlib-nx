import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { PlotData } from '@nodeplotlib/interfaces';
import { plotStack, pages } from '@nodeplotlib/shared-data';

@WebSocketGateway()
export class PagesGateway {
  @SubscribeMessage('pages')
  handlePages(client: any, payload: any): Observable<string[]> {
    return pages.getAll();
  }

  @SubscribeMessage('pageready')
  handleMessage(client: any, payload: any): Observable<PlotData[]> {
    return plotStack.getAll();
  }
}
