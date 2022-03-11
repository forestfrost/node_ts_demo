import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { addRoutes } from "@/utils/routes";
import routes from "@/router/index";
import run from "@/intercept";
const app = express();
const port = 3600;
const host = "127.0.0.1";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public/", express.static("public"));
run(app);
addRoutes(app, routes);
app.listen(port, host, () => {
  console.log(`server is running at http://${host}:${port}`);
});
