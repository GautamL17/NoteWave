const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
    },
    recepient:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
    },
},
{
    timestamps:true
});

const FriendRequest = mongoose.model('FriendRequest',requestSchema)

module.exports = FriendRequest