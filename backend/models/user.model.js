const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    photo: {
        type: String,
        default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    friends: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    friendRequests: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(12)
    this.password = bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    const payload = {
        _id: this._id,
        email: this.email,
        name: this.name,
    }
    return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}


const User = mongoose.model('User', userSchema)

module.exports = User 