import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import * as config from "../config/AppConfig";

export class Router {
  private routeMap: config.IRoute = {};

  constructor() {
    this.createRouteMap(config.PUBLICPATH);
  }

  public route(req: http.IncomingMessage, res: http.ServerResponse) {
    const requestedURL = req.url;
    this.logRequest(req);

    if (requestedURL) {
      if (Object.keys(this.routeMap).includes(requestedURL)) {
        this.fileResponse(res, 200, this.routeMap[requestedURL]);
      } else if (requestedURL == "/") {
        this.fileResponse(res, 200, this.routeMap["/index.html"]);
      } else {
        this.fileResponse(res, 404, this.routeMap["/error/404.html"]);
      }
    } else {
      this.fileResponse(res, 404, this.routeMap["/error/404.html"]);
    }
  }

  private logRequest(req: http.IncomingMessage) {
    console.log(req.socket.remoteAddress, req.method, req.url);
  }

  private logResponse(res: http.ServerResponse, filePath: string) {
    console.log(res.statusCode, filePath);
  }

  private fileResponse(
    res: http.ServerResponse,
    status: number,
    filePath: string
  ) {
    res.statusCode = status;
    res.setHeader("Content-Type", "text/html");
    fs.readFile(filePath, (error, data) => {
      if (error) {
        console.error(error);
      }
      res.write(data);
      res.end();
      this.logResponse(res, filePath);
    });
  }

  private createRouteMap(directory: string) {
    fs.readdir(directory, (error, files) => {
      if (error) {
        console.error(error);
      } else {
        files.forEach((file) => {
          const fullPath = path.join(directory, file);
          const isDirectory = fs.lstatSync(fullPath).isDirectory();

          if (isDirectory) {
            this.createRouteMap(fullPath);
          } else {
            const relativePath = fullPath.split(config.PUBLICPATH)[1];
            this.routeMap[relativePath] = fullPath;
          }
        });
      }
    });
    return this.routeMap;
  }
}
