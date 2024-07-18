const express = require('express')
const router = express.Router()
const {getImageById,getMetaDataById} = require('../controllers/images.controller')

router.get('/api/image/:id',getImageById)
router.get('/api/image/metadata/:id',getMetaDataById)

module.exports = router