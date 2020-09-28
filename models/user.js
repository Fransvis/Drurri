var mongoose              = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema                = mongoose.Schema;

    var personalUserSchema = new Schema (
        {
          firstName: String,
          lastName: String,
          username: String,
          password: String
        }
      )

personalUserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("PersonalUser", personalUserSchema);
