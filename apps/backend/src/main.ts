/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { join } from 'path';
import { INestExpressApplication, INestApplication } from '@nestjs/common';

const globalPrefix = '';
const port = process.env.port || 3333;
let app: INestApplication & INestExpressApplication;

export async function bootstrap() {
  app = await NestFactory.create(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'frontend'), {prefix: '/'});

  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
}

bootstrap();

/* plot$.pipe(
  switchMapTo(plotStack.getAll())
).subscribe((stack) => {

}); */

/* bootstrapServer.subscribe(async (start: boolean) => {
  if (start) {
    await bootstrap();
  } else {

  }
}); */
