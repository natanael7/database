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
      res.json({
        customers: customers,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.summaryAll = function (req, res, next) {
  try {
    Customer.get({}, function (err, customers) {
      let summ = new Summary(customers);
      res.json({
        summary: summ,
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
        result = customers.filter((customer) => {
          return (
            customer[criteria.parameter] >= parseInt(criteria.smallest) &&
            customer[criteria.parameter] <= parseInt(criteria.biggest)
          );
        });
        res = result;
        break;
      case "isNotBetween":
        if (criteria.smallest == undefined || criteria.biggest == undefined)
          res = [];
        result = customers.filter((customer) => {
          return (
            customer[criteria.parameter] <= parseInt(criteria.smallest) ||
            customer[criteria.parameter] >= parseInt(criteria.biggest)
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
      res.json({
        customers: filtredData(customers),
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.summaryFilter = function (req, res, next) {
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
        result = customers.filter((customer) => {
          return (
            customer[criteria.parameter] >= parseInt(criteria.smallest) &&
            customer[criteria.parameter] <= parseInt(criteria.biggest)
          );
        });
        res = result;
        break;
      case "isNotBetween":
        if (criteria.smallest == undefined || criteria.biggest == undefined)
          res = [];
        result = customers.filter((customer) => {
          return (
            customer[criteria.parameter] <= parseInt(criteria.smallest) ||
            customer[criteria.parameter] >= parseInt(criteria.biggest)
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
  function summFiltredData(customers) {
    let results = customers;
    let crit = req.body.criterias;
    for (let i = 0; i < crit.length; i++) results = switched(crit[i], results);
    let summ = new Summary(results);
    return summ;
  }
  try {
    Customer.get({}, function (err, customers) {
      res.json({
        summ: summFiltredData(customers),
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
      res.json(result);
    });
  } catch (err) {
    res.json(err);
  }
};
