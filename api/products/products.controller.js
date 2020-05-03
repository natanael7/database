const Product = require("./products.dao");
const json = require('../../params.json')

exports.getAll = function (req, res, next) {
  try {
    Product.get({}, function (err, products) {
      if (err) {
        res.json(err);
      }
      res.json({
        products: products,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.get = function (req, res, next) {
  try {
    Product.get({ _id: req.params.id }, function (err, products) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        products: products,
      });
    });
  } catch (err) {
    res.json(err);
  }
};

