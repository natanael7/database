const Order = require("./orders.dao");
const Customer = require("../customers/customers.dao.js");

exports.create = async (req, res, next) => {
  console.log(req["body"]);

  let order = {},
    customer = {};
  try {
    order.customer = req.body.customer;
    order.productSet = req.body.productSet;
    order.sum = req.body.sum;
    order.deliveryMethod = req.body.deliveryMethod;
    order.payingMethod = req.body.payingMethod;
    customer.account = req.body.account;
    customer.name = req.body.name;
    customer.phone = req.body.phone;
    customer.region = req.body.region;
    customer.city = req.body.city;
    customer.postCode = req.body.postCode;
    customer.adress = req.body.adress;
    customer.id = req.body.id;
    
    const post = await Order.findOne().sort("-number").exec();

    let newNumber = 0;
    if (post != null) newNumber = post.number + 1;
    order.number = newNumber;

    if (req.body.customer == undefined) {
      const existent = await Customer.find({ account: customer.account });
      if (existent.length > 0) {
        order.customer = existent[0]._id;
        const newOrder = await Order.create(order);
        existent[0].orders.push(newOrder.id);
        existent[0].ltv += newOrder.sum;
        existent[0].save();
        res.json({
          messageOrder: `Order created successfully with id: ${newOrder._id}`,
          messageCustomer: `Added to customer with id: ${newOrder.customer}`,
        });
      } else {
        const newCustomer = await Customer.create(customer);
        order.customer = newCustomer._id;
        const newOrder = await Order.create(order);
        newCustomer.orders.push(newOrder._id);
        newCustomer.ltv += newOrder.sum;
        newCustomer.save();
        res.json({
          messageOrder: `Order created successfully with id: ${newOrder._id}`,
          messageCustomer: `Customer created successfully with id: ${newOrder.customer}`,
        });
      }
    } else {
      order.customer = req.body.customer;
      const newOrder = await Order.create(order);
      res.json({
        messageOrder: `Order created successfully with id: ${newOrder._id}`,
        messageCustomer: `Added to customer with id: ${newOrder.customer}`,
      });
    }
    console.log(order.number);
  } catch (err) {
    res.json(`Error: ${err}`);
  }
};
exports.get = async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id );
    console.log(orders)
    res.json({
      orders: orders,
    });
  } catch (err) {
    res.json(`Error: ${err}`);
  }
};
