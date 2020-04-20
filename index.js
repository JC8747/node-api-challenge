const express = require("express");
var cors = require("cors");
const projectRouter = require("./data/helpers/projectRouter");
const actionRouter = require("./data/helpers/actionRouter");
const server = express();
const port = 4040;

server.use(express.json());
server.use(cors());
server.use("/projects", projectRouter);
server.use("/actions", actionRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});