const express = require('express')
const Blog = require('../models/Blog')

const blogRouter = express.Router()

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
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