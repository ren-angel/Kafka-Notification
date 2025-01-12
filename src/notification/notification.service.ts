import { Injectable } from '@nestjs/common';

// Counter: Usado para contar eventos
// Gauge: Usado para medir valores que podem subir e descer
import { Counter, Gauge } from 'prom-client';

@Injectable()
export class NotificationService {

  // Aqui criamos os contadores e medidores que serão usados para monitorar o serviço. Criamos um contador para contar o total de mensagens processadas, um contador para contar o total de erros ocorridos e um medidor para contar o número de processos ativos.
  private readonly messageCounter: Counter<string>;
  private readonly errorCounter: Counter<string>;
  private readonly activeProcesses: Gauge<string>;

  // No construtor, inicializamos os contadores e medidores com os nomes, descrições e rótulos necessários.
  constructor() {
    this.messageCounter = new Counter({
      name: 'notification_messages_total', // Nome da métrica
      help: 'Total de mensagens processadas pelo serviço de notificação', // Descrição da métrica
      labelNames: ['type'], // Rótulos da métrica. Neste caso, usamos o rótulo `type` para diferenciar o tipo de mensagem
    });

    this.errorCounter = new Counter({
      name: 'notification_errors_total',
      help: 'Total de erros ocorridos no serviço de notificação',
    });

    this.activeProcesses = new Gauge({
      name: 'notification_active_processes',
      help: 'Número de processos de notificação ativos',
    });
  }

  processNotification(message: any): void {

    try {

      console.log('Processando notificação:', message);
      this.activeProcesses.inc(); // Incrementa o medidor de processos ativos

      if (message.type === 'email') {

        console.log(`Enviando E-mail para ${message.to} com o conteúdo: ${message.content}`);

      } else if (message.type === 'sms') {

        console.log(`Enviando SMS para ${message.to} com o conteúdo: ${message.content}`);
      } else {

        console.log('Tipo de notificação desconhecido');
      }

      this.messageCounter.inc({ type: message.type || 'unknown' }); // Incrementa o contador de mensagens processadas
    } catch (error) {

      this.errorCounter.inc(); // Incrementa o contador de erros
      console.error('Erro ao processar a notificação:', error.message);
    } finally {

      this.activeProcesses.dec(); // Decrementa o medidor de processos ativos após ele ser processado com sucesso ou resultado em erro
    }
  }
}
