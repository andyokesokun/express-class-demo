import fs from 'fs';
import winston from 'winston';
import SeqHttpTransport from '../providers/logger_transports/seq';

// Ensure directories exist
['logs/logs', 'logs/errors'].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const currentDate = new Date();
const dataString = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
const logFile = `logs/logs/${dataString}.txt`;
const errorFile = `logs/errors/${dataString}.txt`;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'Express-api-demo' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
    }),
    // new winston.transports.File({ filename: logFile, level: 'info' }),
    new winston.transports.File({ filename: errorFile, level: 'error' }),
    new SeqHttpTransport({
      serverUrl: process.env.SEQ_SERVER_URL as string,
      apiKey: '', // optional
    }),
  ],
});

export default logger;
