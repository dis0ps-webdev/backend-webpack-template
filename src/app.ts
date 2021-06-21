import { HTTPServer } from "./bin/HTTPServer";
import { Router } from "./routes/Router";
import * as config from "./config/AppConfig";

const router = new Router();
const httpServer = new HTTPServer(
  config.HOSTIP,
  config.HOSTPORT,
  router
);
