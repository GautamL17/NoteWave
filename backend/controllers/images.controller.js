// const PDF = require('../models/pdf.model')

// const HandlePdfById = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const image = await Image.findById(id)
//         if (!image) {
//             return res.status(404).json({ message: 'Image not found' });
//         }
//         const newPath = image.path.replace('uploads\\','')
//         const fileName = image.file
//         res.send(
            
//                fileName
            
//         );
//     }
//     catch (error) {
//         console.error('Error fetching image:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

// module.exports = HandleImageById