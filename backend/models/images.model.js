const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const imgSchema = new Schema({
    path:{
        type:String,
        required:true,
    },
    note:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Note',
        required:true,
    },
},{timestamps:true})


const Image = mongoose.model('Image',imgSchema)
module.exports = Image