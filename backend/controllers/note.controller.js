const Note = require('../models/notes.model');
const Image = require('../models/images.model')
const PDF = require('../models/pdfs.models')
const fs = require('fs');
const path = require('path');


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
        const { title, content, category } = req.body;

        if (!req.user) {
            return res.status(401).json({ status: 'error', message: 'User not authenticated' });
        }

        if (!title || !content || !category) {
            return res.status(400).json({ status: 'error', message: 'Please fill all the fields' });
        }

        const note = new Note({
            user: req.user._id,
            title,
            content,
            category,
        });

        // Save the note first to get the note ID
        await note.save();

        // Save images
        if (req.files.images) {
            const imagePromises = req.files.images.map(async (file) => {
                const newImage = new Image({
                    path: '' + file.filename,
                    note: note._id,
                });
                await newImage.save();
                return newImage._id;
            });
            note.images = await Promise.all(imagePromises);
        }

        // Save PDFs
        if (req.files.pdfs) {
            const pdfPromises = req.files.pdfs.map(async (file) => {
                const newPDF = new PDF({
                    path: '' + file.filename,
                    note: note._id, // Ensure note._id is used here
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
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Error in HandleCreateNotes', body: req.body });
    }
};


const HandleGetNotesById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'internal server error'
        });
    }
};

const HandleUpdateNotesById = async (req, res) => {
    try {
        const { title, content, category } = req.body; // Include content field
        const note = await Note.findById(req.params.id);
        console.log('note:', note);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                message: 'You are not authorized'
            });
        }
        if (note) {
            note.title = title;
            note.content = content; // Update content field
            note.category = category;

            const updatedNote = await note.save();
            res.status(200).json({
                message: 'Note updated',
                updatedNote
            });
        } else {
            res.status(400).json({ message: 'Note not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error occurred',
            message: 'Server error'
        });
    }
};

const handleDeleteNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note || (note.user.toString() !== req.user._id.toString())) {
            return res.status(404).json({
                status: 'error occurred',
                message: 'Note does not exist'
            });
        }

        const deleteNote = await Note.findByIdAndDelete(req.params.id);
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

module.exports = {
    HandleGetNotes,
    HandleCreateNotes,
    HandleGetNotesById,
    HandleUpdateNotesById,
    handleDeleteNoteById,
};
