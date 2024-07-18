const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    note: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        required: true
    },
},
{
    timestamps:true,
}
);

const PDF = mongoose.model('PDF', pdfSchema);
module.exports = PDF;
