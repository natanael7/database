const Customer = require("./customers.dao");

exports.create = function (req, res, next) {
  let customer = {};
  let json = require("../../params.json");
  let customerSchema = json.customerSchema;
  customerSchema.forEach((property) => {
    customer[property["prop"]] = req.body[property["prop"]];
  });

  Customer.create(customer, function (err, customer) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: `Customer created successfully with id: ${customer._id}`,
    });
  });
};
exports.getAll = function (req, res, next) {
  Customer.get({}, function (err, customers) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      customers: customers,
    });
  });
};
exports.summaryAll = function (req, res, next) {
  Customer.get({}, function (err, customers) {
    let summ = new Summary(customers);
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
  let customer = {};
  let json = require("../../params.json");
  let customerSchema = json.customerSchema;
  customerSchema.forEach((property) => {
    if (req.body[property["prop"]] != undefined)
      customer[property["prop"]] = req.body[property["prop"]];
  });
  Customer.update({ _id: req.params.id }, customer, function (err, customer) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: "Customer updated successfully",
    });
  });
};
exports.delete = function (req, res, next) {
  Customer.delete({ _id: req.params.id }, function (err, customer) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: "Customer deleted successfully",
    });
  });
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
  Customer.get({}, function (err, customers) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      customers: filtredData(customers),
    });
  });
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
    let summ = new Summary(results)
    return summ;
  }
  Customer.get({}, function (err, customers) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      summ: summFiltredData(customers),
    });
  });
};

// BETA
exports.get = function (req, res, next) {
  Customer.get({ _id: req.params.id }, function (err, customers) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      customers: customers,
    });
  });
};
exports.debugDelete = function (req, res, next) {
  Customer.deleteMany({}, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
