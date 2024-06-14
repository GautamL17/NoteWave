const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    images:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Image',
    }],
    pdfs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PDF',
    }],
},
    {
        timestamps: true,
    }
)

const Note = mongoose.model('Note', noteSchema)
module.exports = Note