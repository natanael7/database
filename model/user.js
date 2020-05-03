const mongoose = require("mongoose");
const _ = require("lodash");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  provider: String,
  uid: String,
  photoUrl: String,
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ["uid", "name", "photoUrl", "provider"]);
};

var User = mongoose.model("User", UserSchema);

module.exports = User;
