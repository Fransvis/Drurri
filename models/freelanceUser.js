var mongoose              = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema                = mongoose.Schema;

    var freelanceUserSchema = new Schema(
      {
        firstName: String,
        lastName: String,
        username: String,
        password: String
      }
    )

    freelanceUserSchema.plugin(passportLocalMongoose);

    module.exports = mongoose.model('FreelanceUser', freelanceUserSchema)