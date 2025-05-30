const express = require('express');
const router = express.Router();
const Model = require('../models/Usermodel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Authentication endpoint
router.post('/authenticate', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await Model.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare password
    if (password !== user.password) { // In production, use proper password hashing
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data and token
    res.json({
      token,
      result: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
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

// : denotes url parameter
router.get('/getbyemail/:email', (req, res) => {

    console.log(req.params.email);
    Model.find({ email: req.params, email })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//getbycity
router.get('/getbycity/:city', (req, res) => {
    Model.find({ city: req.params.city })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Add new user (signup)
router.post('/add', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if user already exists
        const existingUser = await Model.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create new user with role set to 'user' by default
        const newUser = new Model({
            ...req.body,
            role: 'user' // Override the default 'admin' role from schema
        });

        // Save the user
        const savedUser = await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role
            }
        });
    } catch (error) {
        console.error('Error in user registration:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

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

// Get user by ID (protected route)
router.get('/getbyid', verifyToken, async (req, res) => {
  try {
    const user = await Model.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;