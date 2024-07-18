const PDF = require('../models/pdfs.model');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose')

const getPdfById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid PDF ID' });
        }

        const pdf = await PDF.findById(id);
        if (!pdf) {
            return res.status(404).json({ message: 'PDF not found' });
        }

        const pdfPath = path.join(__dirname, '..', 'uploads', pdf.path); // adjust the path to your storage location
        if (fs.existsSync(pdfPath)) {
            res.setHeader('Content-Type', 'application/pdf');
            res.sendFile(pdfPath)
        } else {
            res.status(404).json({ message: 'File not found on server' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const getMetaDataById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid PDF ID' });
        }

        const pdf = await PDF.findById(id);
        if (!pdf) {
            return res.status(404).json({ message: 'PDF not found' });
        }

        res.json({ pdfName: pdf.path });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
 

module.exports = { getPdfById , getMetaDataById};
