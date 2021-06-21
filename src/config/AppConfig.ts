import * as path from "path";

export const HOSTIP = "0.0.0.0";
export const HOSTPORT = 3000;

export const PUBLICPATH = path.join(__dirname, "public");

export interface IRoute {
  [requestPath: string]: string;
}

export const ROUTES: IRoute = {
  "/": path.join(PUBLICPATH, "index.html"),
  "/index.html": path.join(PUBLICPATH, "index.html"),
  "/404.html": path.join(PUBLICPATH, "404.html"),
};
