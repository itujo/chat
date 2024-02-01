import * as venom from 'venom-bot';
import { handleMessageReceived } from './commands';
import logger from './utils/logger';

const LOG_PREFIX = 'app';

function start(client: venom.Whatsapp) {
  client.onAnyMessage((message) => {
    console.log(message.body);

    if (!message.isGroupMsg && message.body.startsWith('/')) {
      handleMessageReceived(client, message)
        .then(() => logger.info(LOG_PREFIX, 'Mensagem processada com sucesso.'))
        .catch((error) =>
          logger.error(LOG_PREFIX, 'Erro ao processar a mensagem:', error)
        );
    }
  });

  logger.info(LOG_PREFIX, 'Bot iniciado e escutando por mensagens...');
}

venom
  .create({
    session: 'chat-app-4',
  })
  .then((client) => {
    logger.info(LOG_PREFIX, 'Bot iniciado com sucesso.');
    start(client);
  })
  .catch((error) => logger.error(LOG_PREFIX, 'Erro ao iniciar o bot:', error));
