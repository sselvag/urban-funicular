require('dotenv').config();

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')

mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

//DATA SANITIZATION
app.use(mongoSanitize())

//BOOKS ROUTE
const booksRouter = require('./routes/books')
app.use('/books', booksRouter)

//AUTOR ROUTE
const authorsRouter = require('./routes/authors')
app.use('/authors', authorsRouter)

//USER ROUTE
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)


app.listen(3000, () => console.log('Server Started'))
