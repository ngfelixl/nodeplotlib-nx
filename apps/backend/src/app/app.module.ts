import { Module } from '@nestjs/common';
import { PagesGateway } from './gateways/pages.gateway';


@Module({
  imports: [],
  controllers: [],
  providers: [PagesGateway]
})
export class AppModule {}
