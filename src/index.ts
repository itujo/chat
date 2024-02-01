import * as venom from 'venom-bot';
import { sendBaianoMessage, sendCaipiraMessage, sendMessage } from './chat';

async function handleCommand(
  client: venom.Whatsapp,
  command: string,
  message: venom.Message
) {
  const msgContent = message.body.split(' ').slice(1).join(' ');
  let response = '';

  switch (command) {
    case '/bot':
      response = `sim, eu sou um papagaio e você disse: ${message.body}`;
      break;
    case '/chat':
      response = await sendMessage(msgContent);
      break;
    case '/caipira':
      response = await sendCaipiraMessage(msgContent);
      break;
    case '/baiano':
      response = await sendBaianoMessage(msgContent);
      break;
    default:
      console.log('Comando não reconhecido.');
      return;
  }

  const sender = command.replace('/', '');

  sendResponse(client, message.from, response, sender);
}

function sendResponse(
  client: venom.Whatsapp,
  to: string,
  response: string,
  sender: string
) {
  client
    .sendText(to, `[${sender}]: ${response}`)
    .then((result) => console.log('Result: ', result))
    .catch((erro) => console.error('Error when sending: ', erro));
}

function start(client: venom.Whatsapp) {
  client.onAnyMessage(async (message) => {
    if (!message.isGroupMsg && message.body.startsWith('/')) {
      const command = message.body.split(' ')[0];
      await handleCommand(client, command, message);
    }
  });
}

venom
  .create({
    session: 'chat-app-4',
  })
  .then((client) => start(client))
  .catch((erro) => console.log(erro));
