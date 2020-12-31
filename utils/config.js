require('dotenv').config()

const PORT = process.env.PORT || 3003
const SECRET = process.env.SECRET || 'SECRET'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/bloglist'

module.exports = {
  PORT,
  SECRET,
  MONGODB_URI
}