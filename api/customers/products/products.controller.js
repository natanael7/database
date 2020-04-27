const Product = require("./products.dao");
const json = require('../../params.json')
exports.create = function (req, res, next) {
  let product = {},
    productSchema = json.productSchema;
  try {
    productSchema.forEach((property) => {
      product[property["prop"]] = req.body[property["prop"]];
    });
    Product.create(product, function (err, product) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        message: `Product created successfully with id: ${product._id}`,
      });
    });
  } catch (err) {
    res.json(`Error: ${err}`);
  }
};
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
exports.update = function (req, res, next) {
  let product = {};
  let json = require("../../params.json");
  let productSchema = json.productSchema;
  productSchema.forEach((property) => {
    if (req.body[property["prop"]] != undefined)
      product[property["prop"]] = req.body[property["prop"]];
  });
  try {
    Product.update({ _id: req.params.id }, product, function (err, product) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        message: "Product updated successfully",
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.delete = function (req, res, next) {
  Product.delete({ _id: req.params.id }, function (err, product) {
    try {
      if (err) {
        res.json(`Error: ${err}`);
      }

      res.json({
        message: "Product deleted successfully",
      });
    } catch (err) {
      res.json(err);
    }
  });
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
exports.debugDelete = function (req, res, next) {
  try {
    Product.deleteMany({}, function (err, result) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json(result);
    });
  } catch (err) {
    res.json(err);
  }
};
