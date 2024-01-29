const server = require("./src/app");
require("dotenv").config();
require("./config/connection").databaseRun(process.env.MONGODB_URI);

const cloudflare = require("cloudflare")({
  email: process.env.CLOUDFLARE_EMAIL,
  key: process.env.CLOUDFLARE_API_KEY,
});

server.serverListen(process.env.PORT);
