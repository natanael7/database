const Order = require("./orders.dao");
const { Summary } = require("./summary.js");

exports.createOrder = function (req, res, next) {
  let order = {};
  let json = require("../../params.json");
  let orderSchema = json.orderSchema;
  orderSchema.forEach((property) => {
    order[property["prop"]] = req.body[property["prop"]];
  });

  Order.create(order, function (err, order) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: `Order created successfully with id: ${order._id}`,
    });
  });
};
exports.getAllOrder = function (req, res, next) {
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
exports.summaryAllOrder = function (req, res, next) {
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
exports.updateOrder = function (req, res, next) {
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
exports.deleteOrder = function (req, res, next) {
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
exports.filterOrder = function (req, res, next) {
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
    let summ = new Summary(results)
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
exports.getOrder = function (req, res, next) {
  Order.get({ _id: req.params.name }, function (err, orders) {
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
