const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please add the title"],
  },

  content: {
    type: String,
    required: [true, "please add the content"],
    minlength: 5,
  },

  category: {
    type: String,
    enum: ["social", "politic", "entertairnment", "health"],
  },
  file: {
    data: Buffer,
    contentType: String,
    select: false,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required:true
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

/*

  title,
  content,
  category:enum['social','politic','health',''ententairnment],
  file,
  auhor:objectId
  date

*/ 

module.exports = mongoose.model("Post", postSchema);
