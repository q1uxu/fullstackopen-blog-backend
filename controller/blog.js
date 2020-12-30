const express = require('express')
const Blog = require('../models/Blog')

const blogRouter = express.Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
  response.status(201).json(savedBlog)
})

module.exports = blogRouter