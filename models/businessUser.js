var mongoose              = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema                = mongoose.Schema;

    var businessUserSchema = new Schema(
      {
        username: String,
        password: String,

        pride: {
        businessName: String,
        businessIndustry: String,
        businessAddress: String,
        businessContact: Number
        },

        gold: {
          businessName: String,
          businessIndustry: String,
          businessAddress: String,
          businessContact: Number
        },
        
        platinum: {
          businessName: String,
          businessIndustry: String,
          businessAddress: String,
          businessContact: Number
        },

        retainer: {
          businessName: String,
          businessIndustry: String,
          businessAddress: String,
          businessContact: Number
        }
      }
    )

businessUserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('BusinessUser', businessUserSchema);