const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const PostSchema  = new Schema({
   title: {
    type: String,
    required: true,
    maxLength: 20,
  },
  content: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;