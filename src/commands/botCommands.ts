import {
  sendBaianoMessage,
  sendCaipiraMessage,
  sendMessage,
} from '../services/openaiService';
import { Message, Whatsapp } from 'venom-bot';
import logger from '../utils/logger';

const LOG_PREFIX = 'botCommands';

async function botCommands(
  command: string,
  msgContent: string
): Promise<string> {
  logger.info(LOG_PREFIX, `Comando recebido: ${command}`, {
    command,
    msgContent,
  });

  switch (command) {
    case '/bot':
      return `sim, eu sou um papagaio e você disse: ${msgContent}`;
    case '/chat':
      return sendMessage(msgContent);
    case '/caipira':
      return sendCaipiraMessage(msgContent);
    case '/baiano':
      return sendBaianoMessage(msgContent);
    default:
      logger.warn(LOG_PREFIX, 'comando não reconhecido.', { command });
      return `comando ${command} não reconhecido.`;
  }
}

export async function handleMessageReceived(
  client: Whatsapp,
  message: Message
) {
  const [command, ...msgContent] = message.body.split(' ');

  if (!command || msgContent.length < 1) {
    logger.error(LOG_PREFIX, 'command or content not provided', {
      command,
      msgContent,
    });

    return;
  }

  const response = await botCommands(command, msgContent.join(' '));
  client
    .sendText(message.from, `[${command.slice(1)} 🤖]: ${response}`)
    .then(() =>
      logger.info(LOG_PREFIX, `Resposta enviada para o comando: ${command}`)
    )
    .catch((error) =>
      logger.error(LOG_PREFIX, 'Erro ao enviar resposta:', error)
    );
}
