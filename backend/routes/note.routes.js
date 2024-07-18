const express = require('express');
const router = express.Router();
const protect = require('../Middlewares/auth.middleware');
const { HandleGetNotes, HandleCreateNotes, HandleGetNotesById, HandleUpdateNotesById, HandleDeleteNoteById, HandleAllNotes } = require('../controllers/note.controller');
const upload = require('../utils/upload');

// Ensure specific routes are defined before dynamic routes
router.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    next();
});

router.post('/create', protect, upload.fields([{ name: 'images' }, { name: 'pdfs' }]), HandleCreateNotes);
router.get('/', protect, HandleGetNotes);
router.get('/all',HandleAllNotes)
router.route('/:id')
    .get(protect, HandleGetNotesById)
    .put(protect, HandleUpdateNotesById)
    .delete(protect, HandleDeleteNoteById);

module.exports = router;
