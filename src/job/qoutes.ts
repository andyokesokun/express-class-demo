import cron from "node-schedule";
import { getQuote } from "../utils/helpers";
import logger from "../utils/logger";

export const printQuoteEvery5sec = () => {

    cron.scheduleJob( "*/5 * * * * *", () => {
       logger.info(`Quote: ${getQuote()}`);
    })
}

