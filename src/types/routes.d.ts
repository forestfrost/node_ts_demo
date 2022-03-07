import { NextFunction, Request, Response } from "express";
declare global {
  type MyRequestType = "get" | "post" | "put" | "delete";
  interface myRouteItem {
    route: string;
    method: MyRequestType;
    cb: (
      req: Request,
      res: Response,
      next?: NextFunction
    ) => Promise<any> | Array<(req: Request, res: Response, next?: NextFunction) => Promise<any>>;
  }
}
