const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();
const saltRounds = 12;

const test = async (req, res) => {
    res.status(200).json({ message: 'API is working' });
};

const HandleSignupUser = async (req, res) => {
    try {
        const { email, name, password, photo } = req.body;
        const isUserExists = await User.findOne({ email });

        if (isUserExists) {
            return res.status(400).json({
                status: 'error occurred',
                message: 'User already exists',
            });
        }

        if (!name) {
            return res.status(400).json({
                status: 'error occurred',
                message: 'Name is required',
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            photo,
        });

        const token = await user.generateAccessToken();
        return res.status(200).json({
            token,
            user,
        });
    } catch (error) {
        console.error('Error has occurred:', error);
        return res.status(500).json({
            status: 'error occurred',
            message: 'Internal server error',
        });
    }
};

const HandleLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: 'error occurred',
                message: 'User does not exist',
            });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: 'error occurred',
                message: 'Password not matched',
            });
        }
        const token = await user.generateAccessToken();
        console.log({
            user,
            token,
        });
        return res.status(200).json({
            status: 'login successful',
            token,
            user,
        });
    } catch (error) {
        console.error('Error occurred at login:', error);
        return res.status(500).json({
            status: 'error occurred',
            message: 'Internal server error'
        });
    }
};


  const HandleEditProfile = async (req, res) => {
    try {
      const { id } = req.params; // Use destructuring to directly get id from params
      const { name, email } = req.body;
  
      // Input validation
      if (!name || !email) {
        return res.status(400).json({
          status: 'error occurred',
          message: 'Name and email are required',
        });
      }
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({
          status: 'error occurred at handleEditProfile',
          message: 'User not found',
        });
      }
  
      user.name = name;
      user.email = email;
      await user.save();
  
      return res.status(200).json(user); // Return the updated user
    } catch (error) {
      console.error('Error occurred at edit profile:', error);
      return res.status(500).json({
        status: 'error occurred',
        message: 'Server error',
      });
    }
  };
  

module.exports = {
    HandleSignupUser,
    HandleLoginUser,
    HandleEditProfile,
    test,
};
