const Note = require('../models/notes.model');
const Image = require('../models/images.model');
const PDF = require('../models/pdfs.model');
const mongoose = require('mongoose');

const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

const HandleGetNotes = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                status: 'error occurred',
                message: 'User not authenticated'
            });
        }
        const notes = await Note.find({ user: req.user._id });
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error occurred',
            message: 'Error in HandleGetNotes'
        });
    }
};

const HandleCreateNotes = async (req, res) => {
    try {
        const { title, content, categories, visibility } = req.body;

        if (!req.user) {
            return res.status(401).json({ status: 'error', message: 'User not authenticated' });
        }

        if (!title || !content || !categories || !Array.isArray(categories)) {
            return res.status(400).json({ status: 'error', message: 'Invalid or missing categories field' });
        }
        const parsedCategories = categories.map(cat => cat.trim()); // Trim whitespace from each category string

        const note = new Note({
            user: req.user._id,
            title,
            content,
            categories: parsedCategories,
            visibility,
        });

        // Save the note first to get the note ID
        await note.save();

        // Save images
        if (req.files && req.files.images) {
            const imagePromises = req.files.images.map(async (file) => {
                const newImage = new Image({
                    path: file.filename,
                    note: note._id,
                });
                await newImage.save();
                return newImage._id;
            });
            note.images = await Promise.all(imagePromises);
        }

        // Save PDFs
        if (req.files && req.files.pdfs) {
            const pdfPromises = req.files.pdfs.map(async (file) => {
                const newPDF = new PDF({
                    path: file.filename,
                    note: note._id,
                });
                await newPDF.save();
                return newPDF._id;
            });
            note.pdfs = await Promise.all(pdfPromises);
        }

        // Save the note again with updated image and pdf references
        await note.save();

        res.status(201).json(note);
    } catch (error) {
        console.error('Error in HandleCreateNotes:', error);
        res.status(500).json({ status: 'error', message: 'Error in HandleCreateNotes', body: req.body });
    }
};

const HandleGetNotesById = async (req, res) => {
    try {
        const noteId = req.params.id;
        if (!isValidObjectId(noteId)) {
            return res.status(400).json({ message: 'Invalid note ID', noteId });
        }

        const note = await Note.findById(noteId);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

const HandleUpdateNotesById = async (req, res) => {
    try {
        const noteId = req.params.id;
        if (!isValidObjectId(noteId)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        const { title, content, categories, visibility } = req.body;
        const note = await Note.findById(noteId);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                message: 'You are not authorized'
            });
        }

        note.title = title;
        note.content = content;
        note.categories = Array.isArray(categories) ? categories.map(cat => cat.trim()) : [];
        note.visibility = visibility;

        const updatedNote = await note.save();
        res.status(200).json({
            message: 'Note updated',
            updatedNote
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error occurred',
            message: 'Server error'
        });
    }
};

const HandleDeleteNoteById = async (req, res) => {
    try {
        const noteId = req.params.id;
        if (!isValidObjectId(noteId)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        const note = await Note.findById(noteId);
        if (!note || (note.user.toString() !== req.user._id.toString())) {
            return res.status(404).json({
                status: 'error occurred',
                message: 'Note does not exist'
            });
        }

        await Note.findByIdAndDelete(noteId);
        res.status(200).json({
            message: 'Note deleted',
            note
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error occurred',
            message: 'Server error'
        });
    }
};


const HandleAllNotes = async(req,res) => {
    try{

        const allNotes = await Note.find({visibility:'public'})
        res.status(200).json({allNotes})
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            status: 'error occurred',
            message: 'Server error'
        });
    }
}

module.exports = {
    HandleGetNotes,
    HandleCreateNotes,
    HandleGetNotesById,
    HandleUpdateNotesById,
    HandleDeleteNoteById,
    HandleAllNotes
};
