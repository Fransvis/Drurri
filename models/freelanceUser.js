var mongoose              = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema                = mongoose.Schema;

    var freelanceUserSchema = new Schema(
      {
        freelancerName: String,
        freelancerSurname: String,
        username: String,
        password: String,
        jobTitle: String,
        location: String,
        about: String,
        website: String,
        instagram: String,
        picture: String
      }
    )

    freelanceUserSchema.plugin(passportLocalMongoose);

    module.exports = mongoose.model('FreelanceUser', freelanceUserSchema)