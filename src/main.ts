import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  // Cria uma instância do microserviço de notificação como uma aplicação hibrída
  const app = await NestFactory.create(AppModule);

  // Conecta o microserviço ao Kafka
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'notification-consumer',
      },
    }
  })
  
  // Inicia o microserviço e o servidor HTTP na porta 5001 para expor as métricas
  await app.startAllMicroservices();
  await app.listen(5000);
  console.log('Microserviço de notificação rodando');
}

bootstrap();