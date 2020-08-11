var mongoose              = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema                = mongoose.Schema;

var UserSchema = new Schema(
   {
     personalUser: {
       firstName: String,
       lastName: String,
       username: String,
       password: String
     }
  }
);


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);