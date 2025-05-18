import express from "express";
import dotenv from "dotenv";
import routes from "./routes/api";
import basicLogger from "./middlewares/logger";
import pageNotFound from "./middlewares/pageNotFound";
import viewRouter from "./routes/view";

const app = express();

dotenv.config();

// express middleware
app.use(express.json())
app.use(basicLogger); //logger middleware);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "templates");

//routes

app.use("/api/v1", routes);
app.use(viewRouter);
// 404 error handling middleware
app.use(pageNotFound);

const startServer = () => {
  //spin up a server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default startServer;