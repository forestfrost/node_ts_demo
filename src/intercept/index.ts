import { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import intercepts from "@/middleware/index";
/**
 * @description cors 配置
 */
const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  maxAge: 60 * 30,
};
//执行cors
const CORS = (app: Express) => {
  app.use(cors(corsConfig));
};
//全局拦截层添加的工具方法
const requestIntercept = (
  app: Express,
  intercepts: Array<(req: Request, res: Response, next: NextFunction) => Promise<any> | void>
) => {
  try {
    intercepts.forEach((item) => {
      app.use(item);
    });
  } catch (e) {
    console.log("拦截层出错:", e);
  }
};
//添加全局拦截层
const runIntercept = (app: Express) => {
  requestIntercept(app, intercepts);
};

const run = (app: Express) => {
  CORS(app);
  runIntercept(app);
};
export default run;
