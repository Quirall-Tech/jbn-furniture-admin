import { z } from "zod";

export const envVariables = z.object({
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
  SIGN_KEY: z.string(),
  PORT: z.string(),
  ACCESS_KEY: z.string(),
  SECRET_ACCESS_KEY: z.string(),
  BUCKET_NAME: z.string(),
  REGION: z.string(),
});
