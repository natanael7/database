const Subscription = require("./subscriptions.dao");
const json = require('../../params.json')
exports.create = function (req, res, next) {
  let subscription = {},
    subscriptionSchema = json.subscriptionSchema;
  try {
    subscriptionSchema.forEach((property) => {
      subscription[property["prop"]] = req.body[property["prop"]];
    });
    Subscription.create(subscription, function (err, subscription) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        message: `Subscription created successfully with id: ${subscription._id}`,
      });
    });
  } catch (err) {
    res.json(`Error: ${err}`);
  }
};
exports.getAll = function (req, res, next) {
  try {
    Subscription.get({}, function (err, subscriptions) {
      if (err) {
        res.json(err);
      }
      res.json({
        subscriptions: subscriptions,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.update = function (req, res, next) {
  let subscription = {};
  let json = require("../../params.json");
  let subscriptionSchema = json.subscriptionSchema;
  subscriptionSchema.forEach((property) => {
    if (req.body[property["prop"]] != undefined)
      subscription[property["prop"]] = req.body[property["prop"]];
  });
  try {
    Subscription.update({ _id: req.params.id }, subscription, function (err, subscription) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        message: "Subscription updated successfully",
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.delete = function (req, res, next) {
  Subscription.delete({ _id: req.params.id }, function (err, subscription) {
    try {
      if (err) {
        res.json(`Error: ${err}`);
      }

      res.json({
        message: "Subscription deleted successfully",
      });
    } catch (err) {
      res.json(err);
    }
  });
};
exports.get = function (req, res, next) {
  try {
    Subscription.get({ _id: req.params.id }, function (err, subscriptions) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json({
        subscriptions: subscriptions,
      });
    });
  } catch (err) {
    res.json(err);
  }
};
exports.debugDelete = function (req, res, next) {
  try {
    Subscription.deleteMany({}, function (err, result) {
      if (err) {
        res.json(`Error: ${err}`);
      }
      res.json(result);
    });
  } catch (err) {
    res.json(err);
  }
};
