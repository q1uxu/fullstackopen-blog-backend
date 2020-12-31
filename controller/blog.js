const express = require('express')
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User');
const config = require('../utils/config')

const blogRouter = express.Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', ['username', 'name'])
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    ...request.body,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401)
      .json({ error: 'only creator can delete the blog' });
  }

  blog.remove();
  response.status(204).end();
})

blogRouter.put('/:id', async (request, response) => {
  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true}).populate('user', ['username', 'name'])
  response.status(201).json(savedBlog)
})

module.exports = blogRouter