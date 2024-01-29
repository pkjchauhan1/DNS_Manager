const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const recordRoutes = require("./routes/record.router");

app.use(express.json());
app.use(cors("*"));
app.use("/api", recordRoutes);

exports.serverListen = (port) => {
  server.listen(port, () => {
    console.log(`${port}`);
  });
};
