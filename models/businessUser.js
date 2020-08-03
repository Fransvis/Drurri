var mongoose              = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose')

var BusinessUserSchema = new mongoose.Schema(
  {
    businessName: String,
    industry:  String,
    businessAddress: String,
    contact: Number,
    email: String,
    password: String
  }
);

BusinessUserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('BusinessUser', BusinessUserSchema);