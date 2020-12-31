const express = require('express')
const Blog = require('../models/Blog')
const User = require('../models/User');

const blogRouter = express.Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', ['username', 'name'])
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const randomUser = await User.findOne()
  const blog = new Blog({
    ...request.body,
    user: randomUser._id
  })
  const savedBlog = await blog.save()
  randomUser.blogs = randomUser.blogs.concat(savedBlog._id)
  await randomUser.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true}).populate('user', ['username', 'name'])
  response.status(201).json(savedBlog)
})

module.exports = blogRouter