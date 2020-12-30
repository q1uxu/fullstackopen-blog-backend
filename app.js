const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controller/blog')

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app