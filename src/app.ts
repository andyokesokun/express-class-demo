import express from "express";
import "dotenv/config";
import routes from "./routes/api";
import auditLogger from "./middlewares/auditMiddleware";
import pageNotFound from "./middlewares/pageNotFound";
import viewRouter from "./routes/view";
import connectToDB from "./db";
import { errorHandler } from "./middlewares/error";
import configureOAuthProviders from "./providers/auth";
import logger from "./utils/logger";
import runScheduledJobs from "./job";
import {connectToRabbitMQ} from "./providers/rabbitMQ";

const app = express();
connectToDB();
connectToRabbitMQ();
app.use(auditLogger); //logger middleware);
// express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "templates");

configureOAuthProviders(app);

//routes

app.use("/api/v1", routes);
app.use(viewRouter);
// 404 error handling middleware
app.use(pageNotFound);
app.use(errorHandler);

const startServer = () => {
  //spin up a server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  process.on('SIGINT', () => {
     logger.info(`Application stopped on port ${PORT} `);
     process.exit(0);
  });

  runScheduledJobs();

};

export default startServer;