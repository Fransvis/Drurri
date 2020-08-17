var mongoose              = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema                = mongoose.Schema;

    var businessUserSchema = new Schema(
      {
        businessName: String,
        businessIndustry: String,
        businessAddress: String,
        businessContact: Number,
        username: String,
        password: String
      }
    )

    businessUserSchema.plugin(passportLocalMongoose);

    module.exports = mongoose.model('BusinessUser', businessUserSchema);