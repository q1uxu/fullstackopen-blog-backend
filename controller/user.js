const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const userRouter = express.Router();

userRouter.post('/', async (request, response) => {
  const body = request.body;
  const password = body.password;

  if (password == undefined || password.length < 3) [
    response.status(400).json({error: 'lack of password, or password\'s lenght lower than 3'})
  ];

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });
  const savedUser = await user.save();
  response.json(savedUser);
});

userRouter.get('/', async (request, response) => {
  const allUsers = await User.find({}).populate('blogs', ['title', 'author', 'url', 'likes', 'comments']);
  response.json(allUsers);
});

userRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', ['title', 'author', 'url', 'likes', 'comments']);
  response.json(user);
});


module.exports = userRouter;