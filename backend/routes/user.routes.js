const express = require('express')
const router = express.Router()
const { test, HandleSignupUser, HandleLoginUser, HandleEditProfile, HandleUserProfiles } = require('../controllers/user.controller')

router.get('/', test)

router.post('/api/users/signup', HandleSignupUser)
router.post('/api/users/login', HandleLoginUser)
router.post('/api/users/:id', HandleEditProfile)
router.get('/api/users/', HandleUserProfiles)


module.exports = router 