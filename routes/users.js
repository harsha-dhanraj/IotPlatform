const express = require('express');
const router = express.Router();
const config = require('../config/database');
const User = require('../models/user');
//only for development-------------------------------------------------
router.get('/all', (req, res, next) => {
  User.getAllUsers((err, users) => {
    if (err) {
      res.json({ success: false, msg: 'Failed !' });
    } else {
      res.json({ success: true, msg: 'Downloaded', users: users });
    }
  });
});
//--------------------------------------------------------------------

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    gateways: req.body.gateways,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
      res.json({
        success: true,
        msg: 'User registered and Api key is generated, save it for future',
        user_API: user._id
      });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        res.json({
          success: true,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            gateways: user.gateways
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});


module.exports = router;
