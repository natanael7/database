const Customer = require("./customers.dao");

exports.create = function (req, res, next) {
  let customer = {};
  let json = require("../../params.json");
  let customerSchema = json.customerSchema;
  customerSchema.forEach((property) => {
    customer[property["prop"]] = req.body[property["prop"]];
  });
  try {
    Customer.create(customer, function (err, customer) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        message: `Customer created successfully with id: ${customer._id}`,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.getAll = function (req, res, next) {
  try {
    Customer.get({}, function (err, customers) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        customers: customers,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.update = function (req, res, next) {
  let customer = {};
  let json = require("../../params.json");
  let customerSchema = json.customerSchema;
  customerSchema.forEach((property) => {
    if (req.body[property["prop"]] != undefined)
      customer[property["prop"]] = req.body[property["prop"]];
  });
  try {
    Customer.update({ _id: req.params.id }, customer, function (err, customer) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        message: "Customer updated successfully",
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.delete = function (req, res, next) {
  try {
    Customer.delete({ _id: req.params.id }, function (err, customer) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        message: "Customer deleted successfully",
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.filter = function (req, res, next) {
  function switched(criteria, customers) {
    let result;
    switch (criteria.type) {
      case "is":
        if (criteria.value == undefined) res = [];
        result = customers.filter((customer) => {
          return customer[criteria.parameter] == criteria.value;
        });
        res = result;
        break;
      case "isNot":
        if (criteria.value == undefined) res = [];
        result = customers.filter((customer) => {
          return customer[criteria.parameter] != criteria.value;
        });
        res = result;
        break;
      case "isBetween":
        if (criteria.smallest == undefined || criteria.biggest == undefined)
          res = [];
        result = orders.filter((order) => {
          if (criteria.date)
            return (
              parseDate(order[criteria.parameter]) >=
                parseDate(criteria.smallest) &&
              parseDate(order[criteria.parameter]) <=
                parseDate(criteria.biggest)
            );
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
          if (criteria.date)
            return (
              parseDate(order[criteria.parameter]) <=
                parseDate(criteria.smallest) ||
              parseDate(order[criteria.parameter]) >=
                parseDate(criteria.biggest)
            );
          return (
            order[criteria.parameter] >= parseInt(criteria.smallest) &&
            order[criteria.parameter] <= parseInt(criteria.biggest)
          );
        });
        res = result;
        break;
      case "isIn":
        if (criteria.array == undefined) res = [];
        result = customers.filter((customer) => {
          return criteria.array.indexOf(customer[criteria.parameter]) != -1;
        });
        res = result;
        break;
      case "isNotIn":
        if (criteria.array == undefined) res = [];
        result = customers.filter((customer) => {
          return criteria.array.indexOf(customer[criteria.parameter]) == -1;
        });
        res = result;
        break;
      default:
        res = [];
        break;
    }
    return res;
  }
  function filtredData(customers) {
    let results = customers;
    let crit = req.body.criterias;
    for (let i = 0; i < crit.length; i++) results = switched(crit[i], results);
    return results;
  }
  try {
    Customer.get({}, function (err, customers) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        customers: filtredData(customers),
      });
    });
  } catch (err) {
    res.json(err);
  }
};

// BETA
exports.get = function (req, res, next) {
  try {
    Customer.get({ _id: req.params.id }, function (err, customers) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        customers: customers,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.debugDelete = function (req, res, next) {
  try {
    Customer.deleteMany({}, function (err, result) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json(result);
    });
  } catch (err) {
    res.json(err);
  }
};
