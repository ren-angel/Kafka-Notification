// Este script envia uma mensagem manualmente para o Kafka

// Importando a biblioteca KafkaJS para comunicação direta com Kafka
const { Kafka } = require('kafkajs');

// Função para enviar mensagens manualmente para o Kafka
async function sendMessage() {

  // Cria uma instância do Kafka com o endereço do broker
  const kafka = new Kafka({
    clientId: 'notification-producer', // Identificação do cliente produtor
    brokers: ['localhost:9092'], // Endereços dos brokers Kafka
  });

  const producer = kafka.producer(); // Cria um produtor Kafka
  await producer.connect(); // Conecta o produtor ao broker

  // Define o conteúdo da mensagem a ser enviada
  const message = {
    type: 'email', // Tipo de notificação (email)
    to: 'test@example.com', // Destinatário
    content: 'E-mail teste', // Conteúdo da mensagem
  };

  // Envia a mensagem para o tópico "notifications"
  await producer.send({
    topic: 'notifications', // Nome do tópico
    messages: [{ value: JSON.stringify(message) }], // Mensagem convertida em string JSON
  });

  console.log('Mensagem enviada:', message); // Log confirmando o envio da mensagem
  await producer.disconnect(); // Desconecta o produtor após o envio
}

// Executa a função de envio de mensagem e captura erros caso ocorram
sendMessage().catch(console.error);
