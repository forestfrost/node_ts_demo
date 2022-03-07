import { Express, NextFunction, Request, Response } from "express";
const loginIntercept = (req: Request, res: Response, next: NextFunction) => {
  console.log("登录拦截逻辑");
  next();
};

export default [loginIntercept];
