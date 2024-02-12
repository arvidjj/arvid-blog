const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const path = require('path');
const folderPath = path.join(__dirname, 'images');
const multer = require('multer');
const sharp = require('sharp'); // Import sharp
const passport = require('passport')
const fs = require('fs');


// Configure multer to store uploaded images in the 'images' folder
const storage = multer.memoryStorage();

const upload = multer({ storage });

// Define the route for uploading images
router.post('/upload', passport.authenticate("jwt", { session: false }), upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded!' });
        }
        fs.access('./public/images', (err) => {
            if (err) {
                console.log("Folder does not exist");
                fs.mkdirSync('./public/images');
            }
        });

        //create a new generic name for the image
        const imageName = Date.now() + '.jpeg';

        await sharp(req.file.buffer).
            resize(750).
            toFile('./public/images/' + imageName);

            //need to return json of image url
        return res.status(200).json({ imageUrl: '/images/' + imageName });
    } catch (error) {
        console.error('Error handling image upload:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
