const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const userRouter = express.Router()

userRouter.post('/', async (request, response) => {
  const body = request.body
  const password = body.password

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  const savedUser = await user.save()
  response.json(savedUser)
})


module.exports = userRouter