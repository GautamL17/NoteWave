const Image = require('../models/images.model');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const getImageById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid image ID' });
        }

        const image = await Image.findById(id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const imagePath = path.join(__dirname, '..', 'uploads', image.path); // Adjust the path to your storage location
        if (fs.existsSync(imagePath)) {
            // Determine the MIME type based on the file extension
            const ext = path.extname(image.path).toLowerCase();
            let contentType;
            switch (ext) {
                case '.jpg':
                case '.jpeg':
                    contentType = 'image/jpeg';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.gif':
                    contentType = 'image/gif';
                    break;
                default:
                    contentType = 'application/octet-stream';
            }

            res.setHeader('Content-Type', contentType);
            res.sendFile(imagePath);
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
            return res.status(400).json({ message: 'Invalid image ID' });
        }

        const image = await Image.findById(id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.json({ imageName: image.path });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getImageById, getMetaDataById };
