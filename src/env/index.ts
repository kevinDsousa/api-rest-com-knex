import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DATABASE_URL: z.string(),
  PORT: z.string().default("3333"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  throw new Error("Verifique as variáveis de ambiente");
}

export const env = _env.data;
