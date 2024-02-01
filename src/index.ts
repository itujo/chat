import * as venom from 'venom-bot';
import { sendMessage } from './chat';

function start(client: venom.Whatsapp) {
  client.onMessage(async (message) => {
    if (message.body.includes('/bot') && message.isGroupMsg === false) {
      client
        .sendText(
          message.from,
          `[bot]: sim, eu sou um papagaio e voce disse: ${message.body}`
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
    if (message.body.includes('/chat') && message.isGroupMsg === false) {
      const msg = message.body.replace('/chat ', '');
      console.log('sending message to chat', msg);

      const response = await sendMessage(msg);
      console.log('chat response', response);

      client
        .sendText(message.from, `[chat]: ${response}`)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}

venom
  .create({
    session: 'chat-app-4', //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
