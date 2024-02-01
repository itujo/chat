import OpenAI from 'openai';
import { envServerSchema } from './env';

const openai = new OpenAI({
  apiKey: envServerSchema.OPENAI_API_KEY,
});

async function createCompletion(
  systemMessage: string,
  userMessage: string
): Promise<string> {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: userMessage },
    ],
    model: envServerSchema.OPENAI_MODEL,
  });

  return (
    completion.choices[0].message.content ??
    'não foi possível se conectar ao servidor'
  );
}

export function sendMessage(message: string): Promise<string> {
  return createCompletion('Você é um assistente útil.', message);
}

export function sendCaipiraMessage(message: string): Promise<string> {
  return createCompletion(
    'Você é um caipira e responde como um caipira',
    message
  );
}

export function sendBaianoMessage(message: string): Promise<string> {
  return createCompletion(
    'Você é um baiano arretado e responde como um baiano arretado',
    message
  );
}
