const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
  },
  add: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  num: {
    type: String,
  },
})

module.exports = mongoose.model('Story', StorySchema)
