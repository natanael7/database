const Order = require("./orders.dao");
const { Summary } = require("./summary.js");

exports.createOrder = function (req, res, next) {
  let order = {}
  let json = require("../../params.json");
  let orderSchema = json.orderSchema
  orderSchema.forEach(property => { 
    order[property["prop"]] = req.body[property["prop"]]
  })  

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

exports.debugDelete = function (req, res, next) {
  Order.deleteMany({},function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
}

exports.getOrders = function (req, res, next) {
  Order.get({}, function (err, orders) {
    let summ = new Summary(orders)
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      orders: summ,
    });
  });
};
// exports.getOrders = function (req, res, next) {
//   Order.get({}, function (err, orders) {
//     if (err) {
//       res.json({
//         error: err,
//       });
//     }
//     res.json({
//       orders: orders,
//     });
//   });
// };
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

exports.removeOrder = function (req, res, next) {
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
