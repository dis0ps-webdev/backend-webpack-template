import * as path from "path";

export const HOSTIP = "0.0.0.0";
export const HOSTPORT = 8080;

export const PUBLICPATH = path.join(__dirname, "public");

export interface IRoute {
  [requestPath: string]: string;
}

// Now dynamically generated at startup in Router.ts
// export const ROUTES: IRoute = {
//   "/": path.join(PUBLICPATH, "index.html"),
//   "/index.html": path.join(PUBLICPATH, "index.html"),
//   "/about.html": path.join(PUBLICPATH, "about.html"),
//   "/contact.html": path.join(PUBLICPATH, "contact.html"),
//   "/404.html": path.join(PUBLICPATH, "404.html"),
// };
