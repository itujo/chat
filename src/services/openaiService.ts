import OpenAI from 'openai';
import { envServerSchema } from '../config/env';
import logger from '../utils/logger';

const LOG_PREFIX = 'openaiService';
const openai = new OpenAI({ apiKey: envServerSchema.OPENAI_API_KEY });

export async function createCompletion(
  systemMessage: string,
  userMessage: string
): Promise<string> {
  try {
    logger.info(LOG_PREFIX, 'Enviando mensagem para OpenAI', {
      systemMessage,
      userMessage,
    });
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage },
      ],
      model: envServerSchema.OPENAI_MODEL,
    });

    return (
      completion.choices[0].message.content ??
      'Não foi possível se conectar ao servidor'
    );
  } catch (error) {
    logger.error(LOG_PREFIX, 'Erro ao comunicar com OpenAI:', { error });
    throw error;
  }
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
