import { z } from "zod";

export const envVariables = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  SIGN_KEY: z.string(),
  PORT: z.string(),
});
