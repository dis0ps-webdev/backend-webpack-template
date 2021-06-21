import * as fs from "fs";
import * as http from "http";
import * as config from "../config/AppConfig";

export class Router {
  constructor() {}

  public route(req: http.IncomingMessage, res: http.ServerResponse) {
    const requestedURL = req.url;
    if (requestedURL) {
      if (Object.keys(config.ROUTES).includes(requestedURL)) {
        this.fileResponse(res, 200, config.ROUTES[requestedURL]);
      } else {
        this.fileResponse(res, 404, config.ROUTES["/404.html"]);
      }
    } else {
      this.fileResponse(res, 404, config.ROUTES["/404.html"]);
    }
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
        console.log(error);
      }
      res.write(data);
      res.end();
    });
  }
}
