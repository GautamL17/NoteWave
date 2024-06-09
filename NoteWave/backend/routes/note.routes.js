const express = require('express')
const router = express.Router()
const { HandleGetNotes, HandleCreateNotes, HandleGetNotesById, HandleUpdateNotesById, handleDeleteNoteById } = require('../controllers/note.controller')
const protect = require('../Middlewares/auth.middleware')
router.get('/', protect, HandleGetNotes)
router.post('/create', protect, HandleCreateNotes)
router.route('/:id')
    .get(HandleGetNotesById)
    .put(protect, HandleUpdateNotesById)
    .delete(protect,handleDeleteNoteById)


module.exports = router