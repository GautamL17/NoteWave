// protect middleware
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log("Token:", token);

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log("Decoded:", decoded);

            req.user = await User.findById(decoded._id).select('-password');
            console.log("User:", req.user);

            if (!req.user) {
                return res.status(401).json({
                    status: 'not authorized, user not found'
                });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({
                status: 'not authorized, token failed'
            });
        }
    } else {
        res.status(401).json({
            status: 'not authorized, no token'
        });
    }
};

module.exports = protect;