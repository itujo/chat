import OpenAI from 'openai';
import { envServerSchema } from './env';

const openai = new OpenAI({
  apiKey: envServerSchema.OPENAI_API_KEY,
});

export async function sendMessage(message: string): Promise<string | null> {
  console.log(message);

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Você é um assistente útil.' },
      { role: 'user', content: message },
    ],
    // model: 'gpt-4',
    model: 'gpt-3.5-turbo',
  });

  console.log({ completion });

  console.log(completion.choices[0]);

  return completion.choices[0].message.content;
}
