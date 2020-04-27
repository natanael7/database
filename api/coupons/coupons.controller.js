const Coupon = require("./coupons.dao");
const json = require('../../params.json')
exports.create = function (req, res, next) {
  let coupon = {},
    couponSchema = json.couponSchema;
  try {
    couponSchema.forEach((property) => {
      coupon[property["prop"]] = req.body[property["prop"]];
    });
    Coupon.create(coupon, function (err, coupon) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        message: `Coupon created successfully with id: ${coupon._id}`,
      });
    });
  } catch (err) {
    res.json(`Error: ${err}`);
  }
};
exports.getAll = function (req, res, next) {
  try {
    Coupon.get({}, function (err, coupons) {
      if (err) {
        res.json(err);
      }
      res.json({
        coupons: coupons,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.update = function (req, res, next) {
  let coupon = {};
  let json = require("../../params.json");
  let couponSchema = json.couponSchema;
  couponSchema.forEach((property) => {
    if (req.body[property["prop"]] != undefined)
      coupon[property["prop"]] = req.body[property["prop"]];
  });
  try {
    Coupon.update({ _id: req.params.id }, coupon, function (err, coupon) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        message: "Coupon updated successfully",
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.delete = function (req, res, next) {
  Coupon.delete({ _id: req.params.id }, function (err, coupon) {
    try {
      if (err) {
        res.json(`Error: ${err}`);
      }

      res.json({
        message: "Coupon deleted successfully",
      });
    } catch (err) {
      res.json(err);
    }
  });
};
exports.get = function (req, res, next) {
  try {
    Coupon.get({ _id: req.params.id }, function (err, coupons) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        coupons: coupons,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.get = function (req, res, next) {
  try {
    Coupon.get({ name: req.params.name }, function (err, coupons) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        coupons: coupons,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.debugDelete = function (req, res, next) {
  try {
    Coupon.deleteMany({}, function (err, result) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json(result);
    });
  } catch (err) {
    res.json(err);
  }
};
