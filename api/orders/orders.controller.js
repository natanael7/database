const Order = require("./orders.dao");
const Customer = require("../customers/customers.dao.js");
function parseDate(date) {
  let arr = date.split(".");
  let res = parseInt(arr[0]);
  let years = 0;
  for (let i = 0; i < parseInt(arr[2]); i++)
    if (i % 4 == 0) years += 366;
    else res += 365;

  let months = parseInt(arr[1]);
  if (months <= 7)
    for (let i = 0; i < months; i++)
      if (i == 2)
        if (parseInt(arr[2]) % 4 != 0) res += 28;
        else res += 29;
      else if (i % 2 == 0) {
        res += 31;
      } else {
        res += 30;
      }
  else {
    for (let i = 0; i < months; i++)
      if (i % 2 != 0) {
        res += 31;
      } else {
        res += 30;
      }
  }
  return res;
}
exports.create = function (req, res, next) {
  function find(customer) {
    let aux;
    Customer.get({ account: customer.account }, function (err, result) {
      if (err) {
        res.json(`Error: ${err}`);
      }
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
    Order.findOne()
      .sort("-number")
      .exec(function (err, post) {
        let newNumber = 0
        if(post != null)
          newNumber = post.number + 1;
        order.number = newNumber;
        customerSchema.forEach((property) => {
          customer[property["prop"]] = req.body[property["prop"]];
        });
        if (req.body.customer == undefined) {
          Customer.get({ account: customer.account }, function (err, existent) {
            if (err) {
              res.json(`Error: ${err}`);
            }
            if (existent.length > 0) {
              order.customer = existent[0]._id;
              Order.create(order, function (err, order) {
                if (err) {
                  res.json(`Error: ${err}`);
                }
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
                if (err) {
                  res.json(`Error: ${err}`);
                }
                order.customer = customer._id;
                Order.create(order, function (err, order) {
                  if (err) {
                    res.json(`Error: ${err}`);
                  }
                  customer.orders.push(order._id);
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
            if (err) {
              res.json(`Error: ${err}`);
            }
            res.json({
              messageOrder: `Order created successfully with id: ${order._id}`,
              messageCustomer: `Added to customer with id: ${order.customer}`,
            });
          });
        }
      });
  } catch (err) {
    res.json(`Error: ${err}`);
  }
};
exports.get = function (req, res, next) {
  try {
    Order.get({ _id: req.params.id }, function (err, orders) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        orders: orders,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
