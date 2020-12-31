const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.plugin(require('mongoose-unique-validator'));
const blogRouter = require('./controller/blog')
const userRouter = require('./controller/user')
const loginRouter = require('./controller/login')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app