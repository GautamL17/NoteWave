const express = require('express')
const router = express.Router()
const {getPdfById,getMetaDataById} = require('../controllers/pdfs.controller')

router.get('/api/pdf/:id',getPdfById)
router.get('/api/pdf/metadata/:id',getMetaDataById)

module.exports = router