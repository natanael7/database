let express = require("express");
let log = require("morgan")("dev");
let bodyParser = require("body-parser");

let properties = require("./config/properties");
let db = require("./config/database");

let ordersRoutes = require("./api/orders/orders.routes");
let customersRoutes = require("./api/customers/customers.routes");
let productsRoutes = require("./api/products/products.routes");
let couponsRoutes = require("./api/coupons/coupons.routes");
let subscriptionsRoutes = require("./api/subscriptions/subscriptions.routes");

let app = express();

//configure bodyparser
let bodyParserJSON = bodyParser.json();
let bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

//initialise express router
let router = express.Router();

// call the database connectivity function
db();

// configure app.use()
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling
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

// use express router
app.use(express.static("./public"));
app.use("/api", router);

ordersRoutes(router);
customersRoutes(router);
productsRoutes(router);
couponsRoutes(router);
subscriptionsRoutes(router);

// intialise server
app.listen(process.env.PORT || properties.PORT, (req, res) => {
  console.log(`Server is running on ${properties.PORT} port.`);
});
