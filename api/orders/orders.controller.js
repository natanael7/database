const Order = require("./orders.dao");
const Customer = require("../customers/customers.dao.js");
const { Summary } = require("./summary.js");

exports.create = function (req, res, next) {
  function find(customer) {
    let result;
    Customer.get({ account: customer.account }, function (err, result) {
      result = res;
    });
    return result;
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
    if (req.body.customer == undefined) {
      const existent = find(customer);
      if (existent != undefined) {
        order.customer = existent._id;
        Order.create(order, function (err, order) {
          existent.orders.push(order.id);
          existent.ltv += order.sum;
          existent.save();
          res.json({
            messageOrder: `Order created successfully with id: ${order._id}`,
            messageCustomer: `Added to customer with id: ${order.customer}`,
          });
        });
      } else {
        customerSchema.forEach((property) => {
          customer[property["prop"]] = req.body[property["prop"]];
        });
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
  Order.get({}, function (err, orders) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      orders: orders,
    });
  });
};
exports.summaryAll = function (req, res, next) {
  Order.get({}, function (err, orders) {
    let summ = new Summary(orders);
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      summary: summ,
    });
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
  Order.update({ _id: req.params.id }, order, function (err, order) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: "Order updated successfully",
    });
  });
};
exports.delete = function (req, res, next) {
  Order.delete({ _id: req.params.id }, function (err, order) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: "Order deleted successfully",
    });
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
  Order.get({}, function (err, orders) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      orders: filtredData(orders),
    });
  });
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
  Order.get({}, function (err, orders) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      summ: summFiltredData(orders),
    });
  });
};

// BETA
exports.get = function (req, res, next) {
  Order.get({ _id: req.params.id }, function (err, orders) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      orders: orders,
    });
  });
};
exports.debugDelete = function (req, res, next) {
  Order.deleteMany({}, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
