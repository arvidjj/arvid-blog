const bcrypt = require('bcrypt');
const Post = require('../models/post')
const { body, validationResult } = require('express-validator');
const postController = {};

postController.createPost = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, author } = req.body;
    // check timestamp
    let timestamp = Date.now();
    if (req.body.timestamp) {
      timestamp = req.body.timestamp;
    }
    // check published
    let published = false;
    if (req.body.published) {
      published = req.body.published;
    }
    // Create the user
    const post = new Post({
      title,
      content,
      author,
      timestamp,
      published
    });

    // Save the user to the database
    await post.save();
    res.status(201).json({ message: 'Post created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//get all users
postController.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

postController.getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//put
postController.updatePost = async (req, res) => {

};

module.exports = postController;
