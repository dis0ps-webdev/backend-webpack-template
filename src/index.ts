import { createServer } from "http";

class httpTest {
  private server: any;

  constructor(host: string, port: number) {
    this.server = createServer((req: any, res: any) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello Everyone!");
    });

    this.server.listen(port, host, () => {
      console.log("Web server running at http://%s:%s", host, port);
    });
  }
}

const httpServer = new httpTest("0.0.0.0", 3000);
