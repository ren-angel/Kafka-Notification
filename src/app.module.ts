import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register(), // Registra o módulo do Prometheus
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'notification-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})

export class AppModule {}