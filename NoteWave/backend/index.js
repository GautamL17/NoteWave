const express = require('express')
const { notes } = require('./utils/data')
require('dotenv').config()
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const monogoDB = require('./utils/connection')
const PORT = 3000 || process.env.PORT
const URL = 'mongodb://localhost:27017/notewave'
const userRoutes = require('./routes/user.routes')
const notesRoutes = require('./routes/note.routes')


app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

app.use(express.json())

app.use('/', userRoutes)

app.use('/api/notes/', notesRoutes)
app.use('/api/users/', userRoutes)

monogoDB(URL)

app.listen(PORT, () => (console.log('server started at port 3000')))