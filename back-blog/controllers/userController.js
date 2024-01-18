const bcrypt = require('bcrypt');
const User = require('../models/user')
const { body, validationResult } = require('express-validator');
const userController = {};

userController.createUser = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password, email, role } = req.body;
    const users = await User.find();
    // If email is already in use
    const emailExists = users.find((user) => user.email === email);
    if (emailExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }
  
    // Check if an admin already exists
    if (role === 'admin') {
      const admin = users.find((user) => user.role === 'admin');
      if (admin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({
      username,
      password: hashedPassword,
      email,
      role,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//get all users
userController.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

userController.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//put
userController.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, password, email, role } = req.body;

  try {
    // Check if the user with the specified ID exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user properties
    if (username) user.username = username;
    if (password) user.password = password;
    if (email) user.email = email;
    if (role) user.role = role;

    // Save the updated user
    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = userController;
