import { Request } from "express";
import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({})
export const httpLogger = pinoHttp({
  logger,
  customLogLevel: (res: Request, err: any) => {
    if(!res.statusCode) return "info";
    
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    }
    if (res.statusCode >= 500 || err) {
      return "error";
    }
    return "info";
  },
})