var mongoose              = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema                = mongoose.Schema;

    var freelanceUserSchema = new Schema(
      {
        freelancerName: String,
        freelancerSurname: String,
        username: String,
        password: String,
        industry: String,
        location: String,
        about: String,
        specialty: String,
        tools: String,
        picture: String,
        coverPhot: String,
        link1: String,
        link2: String,
        projects: [
          {
          type: Schema.Types.ObjectId,
          ref: 'Project'
        }
      ]
      }
    )

    freelanceUserSchema.plugin(passportLocalMongoose);

    module.exports = mongoose.model('FreelanceUser', freelanceUserSchema)