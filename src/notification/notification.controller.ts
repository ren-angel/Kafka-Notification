import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {

  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('notifications')
  handleNotification(@Payload() data: any) {

    try {

      const message = data?.value ? JSON.parse(data.value) : data;

      if (message && message.type) {

        console.log('Notificação recebida:', message);
        this.notificationService.processNotification(message);
      } else {

        console.error('Recebeu uma mensagem inválida:', data);
      }
    } catch (error) {

      console.error('Erro ao processar a mensagem:', error.message, data);
    }
  }
}
