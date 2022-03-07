export let root = new Map();
import { Express, NextFunction, Request, Response } from "express";
export function addRoute(
  app: Express,
  route: string,
  method: MyRequestType,
  cb: (
    req: Request,
    res: Response,
    next?: NextFunction
  ) => Promise<any> | Array<(req: Request, res: Response, next?: NextFunction) => Promise<any>>
): void {
  if (root.has(route) && root.get(route) === method) throw new Error("该路由已经定义:" + " " + route);
  if (!["get", "post", "put", "delete"].includes(method)) {
    throw new Error("method 必须为 get ,post , put, delete 其中一种");
  }
  if (!Array.isArray(cb) && typeof cb !== "function") {
    throw new Error("cb 必须为函数组成的数组或者函数");
  }
  root.set(route, method);
  app[method](route, cb);
}
export function addRoutes(app: Express, routeArray: Array<myRouteItem>) {
  if (!Array.isArray(routeArray)) throw new TypeError("routeArray 应该是一个数组");
  routeArray.forEach((item) => {
    const { route, method, cb } = item;
    addRoute(app, route, method, cb);
  });
}
