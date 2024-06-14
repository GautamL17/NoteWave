const express = require('express');
const router = express.Router();
const protect = require('../Middlewares/auth.middleware');
const { HandleGetNotes, HandleCreateNotes, HandleGetNotesById, HandleUpdateNotesById, handleDeleteNoteById } = require('../controllers/note.controller');
const upload = require('../utils/upload');

router.post('/create', protect, upload.fields([{ name: 'images' }, { name: 'pdfs' }]), HandleCreateNotes);
router.get('/', protect, HandleGetNotes);
router.route('/:id')
    .get(protect, HandleGetNotesById)
    .put(protect, HandleUpdateNotesById)
    .delete(protect, handleDeleteNoteById);

module.exports = router;
