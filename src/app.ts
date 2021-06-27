import { HTTPServer } from "./bin/HTTPServer";
import { Router } from "./routes/Router";
import * as config from "./config/AppConfig";

const handleSignals = (signal: string) => {
  console.log(`Process signal received: ${signal}`);
  console.log(`Node process ${process.pid} exiting...`);
  process.exit();
};

const router = new Router();
const httpServer = new HTTPServer(config.HOSTIP, config.HOSTPORT, router);

process.on("SIGINT", handleSignals);
process.on("SIGTERM", handleSignals);
