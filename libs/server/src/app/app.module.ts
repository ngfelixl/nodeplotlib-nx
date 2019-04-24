import { Module } from '@nestjs/common';
import { PlotsGateway } from './gateways/plots.gateway';


@Module({
  imports: [],
  controllers: [],
  providers: [PlotsGateway]
})
export class AppModule {}
