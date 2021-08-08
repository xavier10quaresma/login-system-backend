const express = require('express')
const cors = require('cors')
const { fg, reset } = require('./config/colors')
require('dotenv').config()

// Settings
const app = express()
const port = process.env.PORT || process.env.API_PORT

// Database
require('./config/database')

// Middlewares
app.use(express.json())
app.use(cors())

// Get Routes
app.use('/api/users', require('./routes/userRoute'))


// Server listening
app.listen(port, () => console.log(`==> ${fg.blue}Server is listening on port ${port} ${reset} <==`))