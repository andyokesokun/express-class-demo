import express from "express";
import dotenv from "dotenv";
import routes from "./routes/api";
import basicLogger from "./middlewares/loggerMiddleware";
import pageNotFound from "./middlewares/pageNotFound";
import viewRouter from "./routes/view";
import connectToDB from "./db";
import { errorHandler } from "./middlewares/error";
import configureOAuthProviders from "./providers/auth";

const app = express();

dotenv.config();
connectToDB();
app.use(basicLogger); //logger middleware);
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
    console.log(`Server is running on port ${PORT}`);
  });
};

export default startServer;