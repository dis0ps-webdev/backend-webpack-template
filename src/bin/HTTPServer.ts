import { createServer } from "http";
import { Router } from "../routes/Router";

export class HTTPServer {
  private server: any;

  constructor(host: string, port: number, router: Router) {
    this.server = createServer((req: any, res: any) => {
      router.route(req, res);
    });

    this.server.listen(port, host, () => {
      console.log("Web server running at http://%s:%s", host, port);
    });
    this.server.on("error", (e: any) => console.log(`ERROR: ${e}`));
  }
}
