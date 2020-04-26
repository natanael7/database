const Order = require("./orders.dao");
const Customer = require("../customers/customers.dao.js");
const { Summary } = require("./summary.js");
exports.create = function (req, res, next) {
  function find(customer) {
    let aux;
    Customer.get({ account: customer.account }, function (err, result) {
      aux = result;
    });
    return aux;
  }
  let order = {},
    customer = {},
    json = require("../../params.json"),
    orderSchema = json.orderSchema,
    customerSchema = json.customerSchema;
  try {
    orderSchema.forEach((property) => {
      order[property["prop"]] = req.body[property["prop"]];
    });
    customerSchema.forEach((property) => {
      customer[property["prop"]] = req.body[property["prop"]];
    });
    if (req.body.customer == undefined) {
      Customer.get({ account: customer.account }, function (err, existent) {
        if (existent.length > 0) {
          order.customer = existent[0]._id;
          Order.create(order, function (err, order) {
            existent[0].orders.push(order.id);
            existent[0].ltv += order.sum;
            existent[0].save();
            res.json({
              messageOrder: `Order created successfully with id: ${order._id}`,
              messageCustomer: `Added to customer with id: ${order.customer}`,
            });
          });
        } else {
          Customer.create(customer, function (err, customer) {
            order.customer = customer._id;
            Order.create(order, function (err, order) {
              customer.orders.push(order.id);
              customer.save();
              res.json({
                messageOrder: `Order created successfully with id: ${order._id}`,
                messageCustomer: `Customer created successfully with id: ${order.customer}`,
              });
            });
          });
        }
      });
    } else {
      order.customer = req.body.customer;
      Order.create(order, function (err, order) {
        res.json({
          messageOrder: `Order created successfully with id: ${order._id}`,
          messageCustomer: `Added to customer with id: ${order.customer}`,
        });
      });
    }
  } catch (err) {
    res.json(`Error: ${err}`);
  }
};
exports.getAll = function (req, res, next) {
  try {
    Order.get({}, function (err, orders) {
      res.json({
        orders: orders,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.summaryAll = function (req, res, next) {
  Order.get({}, function (err, orders) {
    let summ = new Summary(orders);
    try {
      res.json({
        summary: summ,
      });
    } catch (err) {
      res.json(err);
    }
  });
};
exports.update = function (req, res, next) {
  let order = {};
  let json = require("../../params.json");
  let orderSchema = json.orderSchema;
  orderSchema.forEach((property) => {
    if (req.body[property["prop"]] != undefined)
      order[property["prop"]] = req.body[property["prop"]];
  });
  try {
    Order.update({ _id: req.params.id }, order, function (err, order) {
      res.json({
        message: "Order updated successfully",
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.delete = function (req, res, next) {
  Order.delete({ _id: req.params.id }, function (err, order) {
    try {
      res.json({
        message: "Order deleted successfully",
      });
    } catch (err) {
      res.json(err);
    }
  });
};
exports.filter = function (req, res, next) {
  function switched(criteria, orders) {
    let result;
    switch (criteria.type) {
      case "is":
        if (criteria.value == undefined) res = [];
        result = orders.filter((order) => {
          return order[criteria.parameter] == criteria.value;
        });
        res = result;
        break;
      case "isNot":
        if (criteria.value == undefined) res = [];
        result = orders.filter((order) => {
          return order[criteria.parameter] != criteria.value;
        });
        res = result;
        break;
      case "isBetween":
        if (criteria.smallest == undefined || criteria.biggest == undefined)
          res = [];
        result = orders.filter((order) => {
          return (
            order[criteria.parameter] >= parseInt(criteria.smallest) &&
            order[criteria.parameter] <= parseInt(criteria.biggest)
          );
        });
        res = result;
        break;
      case "isNotBetween":
        if (criteria.smallest == undefined || criteria.biggest == undefined)
          res = [];
        result = orders.filter((order) => {
          return (
            order[criteria.parameter] <= parseInt(criteria.smallest) ||
            order[criteria.parameter] >= parseInt(criteria.biggest)
          );
        });
        res = result;
        break;
      case "isIn":
        if (criteria.array == undefined) res = [];
        result = orders.filter((order) => {
          return criteria.array.indexOf(order[criteria.parameter]) != -1;
        });
        res = result;
        break;
      case "isNotIn":
        if (criteria.array == undefined) res = [];
        result = orders.filter((order) => {
          return criteria.array.indexOf(order[criteria.parameter]) == -1;
        });
        res = result;
        break;
      default:
        res = [];
        break;
    }
    return res;
  }
  function filtredData(orders) {
    let results = orders;
    let crit = req.body.criterias;
    for (let i = 0; i < crit.length; i++) results = switched(crit[i], results);
    return results;
  }
  try {
    Order.get({}, function (err, orders) {
      res.json({
        orders: filtredData(orders),
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.summaryFilter = function (req, res, next) {
  function switched(criteria, orders) {
    let result;
    switch (criteria.type) {
      case "is":
        if (criteria.value == undefined) res = [];
        result = orders.filter((order) => {
          return order[criteria.parameter] == criteria.value;
        });
        res = result;
        break;
      case "isNot":
        if (criteria.value == undefined) res = [];
        result = orders.filter((order) => {
          return order[criteria.parameter] != criteria.value;
        });
        res = result;
        break;
      case "isBetween":
        if (criteria.smallest == undefined || criteria.biggest == undefined)
          res = [];
        result = orders.filter((order) => {
          return (
            order[criteria.parameter] >= parseInt(criteria.smallest) &&
            order[criteria.parameter] <= parseInt(criteria.biggest)
          );
        });
        res = result;
        break;
      case "isNotBetween":
        if (criteria.smallest == undefined || criteria.biggest == undefined)
          res = [];
        result = orders.filter((order) => {
          return (
            order[criteria.parameter] <= parseInt(criteria.smallest) ||
            order[criteria.parameter] >= parseInt(criteria.biggest)
          );
        });
        res = result;
        break;
      case "isIn":
        if (criteria.array == undefined) res = [];
        result = orders.filter((order) => {
          return criteria.array.indexOf(order[criteria.parameter]) != -1;
        });
        res = result;
        break;
      case "isNotIn":
        if (criteria.array == undefined) res = [];
        result = orders.filter((order) => {
          return criteria.array.indexOf(order[criteria.parameter]) == -1;
        });
        res = result;
        break;
      default:
        res = [];
        break;
    }
    return res;
  }
  function summFiltredData(orders) {
    let results = orders;
    let crit = req.body.criterias;
    for (let i = 0; i < crit.length; i++) results = switched(crit[i], results);
    let summ = new Summary(results);
    return summ;
  }
  try {
    Order.get({}, function (err, orders) {
      res.json({
        summ: summFiltredData(orders),
      });
    });
  } catch (err) {
    res.json(err);
  }
};

// BETA
exports.get = function (req, res, next) {
  try {
    Order.get({ _id: req.params.id }, function (err, orders) {
      res.json({
        orders: orders,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.debugDelete = function (req, res, next) {
  try {
    Order.deleteMany({}, function (err, result) {
      res.json(result);
    });
  } catch (err) {
    res.json(err);
  }
};
