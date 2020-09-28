var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

    var ProjectSchema = new Schema (
      {
      title: String,
      date: String,
      image: String,
      image1: String
    }
    )

module.exports = mongoose.model('Project', ProjectSchema)