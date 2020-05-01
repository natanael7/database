const express = require("express");

const app = express();

// DB Config
let config = require("./config/config");
let db = require("./config/database");
db();

const log = require("morgan")("dev");
app.use(log);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});


const apiRouter = require("./api/router");
app.use("/api", apiRouter);

const passport = require("passport");
const authRouter = require("./routes/auth_route");
app.use(passport.initialize());
app.use("/api/authentication", authRouter);
app.get("/", (req, res) => {
  res.json({ root: "running" });
});

app.listen(process.env.PORT || config.PORT, (req, res) => {
  console.log(`Server is running on ${config.PORT} port.`);
});
