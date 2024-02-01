import z from 'zod';
import { config } from 'dotenv';
config();

const envSchema = z.object({
  OPENAI_API_KEY: z.string().trim().min(1),
  PORT: z.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

const envServer = envSchema.safeParse({
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
});

if (!envServer.success) {
  console.error(envServer.error.issues);
  throw new Error('There is an error with the server environment variables');
}

export const envServerSchema = envServer.data;

type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}
