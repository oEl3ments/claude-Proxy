import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import express from "express";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import wisp from "wisp-server-node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Order matters: public/uv/uv.config.js overrides the package default.
app.use(express.static(join(__dirname, "public")));
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

const server = createServer(app);

// The proxy transport talks to this WebSocket endpoint.
server.on("upgrade", (req, socket, head) => {
  if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head);
  else socket.end();
});

const port = Number(process.env.PORT) || 8080;
server.listen(port, () => console.log(`Search proxy running at http://localhost:${port}`));
