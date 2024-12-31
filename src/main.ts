import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Origen permitido
    credentials: true, // Permitir envío de cookies y credenciales
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
