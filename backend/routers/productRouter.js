const express = require('express');
const router = express.Router();
const Model = require('../models/productmodel');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/add', upload.array('images'), async (req, res) => {
    try {
        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "diy-products" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                
                stream.end(file.buffer);
            });
        });

        const imageUrls = await Promise.all(uploadPromises);
        
        let kits = [];
        try {
            kits = JSON.parse(req.body.kits || '[]');
            // Validate and ensure each kit has the required fields
            if (!Array.isArray(kits)) {
                return res.status(400).json({ error: 'Kits must be an array' });
            }
            
            kits = kits.map((kit, index) => {
                if (!kit.kitName || !kit.kitDescription) {
                    throw new Error(`Kit at index ${index} is missing required fields`);
                }
                return {
                    kitName: String(kit.kitName),
                    kitDescription: String(kit.kitDescription),
                    kitPrice: Number(kit.kitPrice || 0)
                };
            });
        } catch (error) {
            return res.status(400).json({ 
                error: 'Invalid kits data format', 
                details: error.message 
            });
        }
        
        const productData = {
            ...req.body,
            images: imageUrls,
            kits: kits
        };

        const result = await new Model(productData).save();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//getall
router.get('/getall', (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})


router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;