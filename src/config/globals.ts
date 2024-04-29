import { z } from "zod";
import { envVariables } from "./environments";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
