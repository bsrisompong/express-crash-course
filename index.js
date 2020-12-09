const express = require('express')
const path = require('path')
var exphbs = require('express-handlebars')
const fetch = require('node-fetch')

const membersRoute = require('./routes/api/members')

// const logger = require('./middleware/logger')

const app = express()

// Init middleware
// app.use(logger)

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extened: false }))

// Homepage Route
app.get('/', async (req, res) => {
  const result = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const members = await result.json()

  res.render('index', {
    title: 'Member App',
    members,
  })
})

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Members API Routes
app.use('/api/members', membersRoute)

// check environment variable if that's not avaliable then we want to run on 5000
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) // listen on a port
