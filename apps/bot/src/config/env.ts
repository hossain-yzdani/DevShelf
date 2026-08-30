import { z } from "zod";
import { config } from "dotenv";

config();

const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, "BOT_TOKEN is required"),
  API_BASE_URL: z.string().url("API_BASE_URL must be valid URL"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

const env = envSchema.parse(process.env);

export { env };
