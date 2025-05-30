const express = require('express');
const router = express.Router();
const CartModel = require('../models/CartModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify token and extract userId
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Get user's cart
router.get('/get', verifyToken, async (req, res) => {
    try {
        let cart = await CartModel.findOne({ userId: req.userId })
            .populate('items.productId', 'name images kits price'); // Populate product details

        if (!cart) {
            // If no cart exists, create an empty one
            cart = await CartModel.create({
                userId: req.userId,
                items: []
            });
        }

        res.json(cart);
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ message: 'Error getting cart' });
    }
});

// Add item to cart
router.post('/add', verifyToken, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await CartModel.findOne({ userId: req.userId });

        if (!cart) {
            // Create new cart if doesn't exist
            cart = await CartModel.create({
                userId: req.userId,
                items: [{ productId, quantity }]
            });
        } else {
            // Check if product already exists in cart
            const existingItem = cart.items.find(
                item => item.productId.toString() === productId
            );

            if (existingItem) {
                // Update quantity if item exists
                existingItem.quantity += quantity;
            } else {
                // Add new item if it doesn't exist
                cart.items.push({ productId, quantity });
            }

            await cart.save();
        }

        // Return populated cart
        cart = await cart.populate('items.productId', 'name images kits price');
        res.json(cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart' });
    }
});

// Update item quantity
router.put('/update/:productId', verifyToken, async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;

        const cart = await CartModel.findOne({ userId: req.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.find(
            item => item.productId.toString() === productId
        );

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cartItem.quantity = quantity;
        await cart.save();

        // Return populated cart
        const updatedCart = await cart.populate('items.productId', 'name images kits price');
        res.json(updatedCart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Error updating cart' });
    }
});

// Remove item from cart
router.delete('/remove/:productId', verifyToken, async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await CartModel.findOne({ userId: req.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        await cart.save();

        // Return populated cart
        const updatedCart = await cart.populate('items.productId', 'name images kits price');
        res.json(updatedCart);
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Error removing from cart' });
    }
});

// Clear cart
router.delete('/clear', verifyToken, async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Error clearing cart' });
    }
});

module.exports = router;
