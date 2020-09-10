var mongoose = require('mongoose'),
    // passportLocalMongoose = require('passport-Local-Mongoose'),
    Schema   = mongoose.Schema

    var ProjectSchema = new Schema (
      {
      title: String,
      date: String,
      image: String
    }
    )

    // ProjectSchema.plugin(passportLocalMongoose);

    module.exports = mongoose.model('Project', ProjectSchema)