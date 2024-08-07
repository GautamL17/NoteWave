const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const mongoDB = require('./utils/connection');
const userRoutes = require('./routes/user.routes');
const notesRoutes = require('./routes/note.routes');
const pdfRoutes = require('./routes/pdf.routes');
const imgRoutes = require('./routes/image.routes');
const path = require('path');
const PORT = process.env.PORT || 3000;
const URL = 'mongodb://localhost:27017/notewave';


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    next();
});

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', pdfRoutes);
app.use('/', imgRoutes);
app.use('/api/notes', notesRoutes);
app.use('/', userRoutes);

mongoDB(URL);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
