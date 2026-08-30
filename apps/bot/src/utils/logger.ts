import pino from "pino";
import { env } from "../config/env";

export const logger = pino({
  level: env.LOG_LEVEL,
  transport:
    env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname",
          },
        }
      : undefined,
  timestamp: pino.stdTimeFunctions.isoTime,
});

export function logError(context: string, error: unknown) {
  if (error instanceof Error) {
    logger.error({ err: error, context }, error.message);
  } else {
    logger.error({ context, error }, "Unknown error occurred");
  }
}
