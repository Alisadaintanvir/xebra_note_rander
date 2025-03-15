require("module-alias/register");
require("dotenv").config();

if (process.env.NODE_ENV === "development") {
  require("module-alias").addAlias("@", __dirname + "/../src");
} else {
  require("module-alias").addAlias("@", __dirname);
}

// all imports should be done after module-alias
const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");
const { notFoundHandler, errorHandler } = require("@/helpers/errorHandler");

const app = express();

app.use(express.json());

const server = createServer(app);

// database connection
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(async () => {
    console.log("DB connection successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
