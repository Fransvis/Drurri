var mongoose              = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema                = mongoose.Schema;

var personalUserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    userName: String,
    password: String
  }
);

// var freelancerUserSchema = new Schema(
//   {
//     firstName: String,
//     lastName: String,
//     userName: String,
//     passoword: String
//   }
// )


personalUserSchema.plugin(passportLocalMongoose);
// freelancerUserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('PersonalUser', personalUserSchema);
// module.exports = mongoose.model('FreelanceUser', freelancerUserSchema);