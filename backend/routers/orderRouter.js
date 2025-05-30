const express = require('express');
const router = express.Router();
const OrderModel = require('../models/orderModel');
const CartModel = require('../models/CartModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify token
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

// Create new order
router.post('/place', verifyToken, async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress } = req.body;

        // Create the order
        const order = await OrderModel.create({
            userId: req.userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod: 'COD'
        });

        // Clear the user's cart after successful order placement
        await CartModel.findOneAndUpdate(
            { userId: req.userId },
            { $set: { items: [] } }
        );

        res.status(201).json(order);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Error placing order' });
    }
});

// Get user's orders
router.get('/my-orders', verifyToken, async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.userId })
            .populate('items.productId')
            .sort({ orderDate: -1 });

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Get single order details
router.get('/:orderId', verifyToken, async (req, res) => {
    try {
        const order = await OrderModel.findOne({
            _id: req.params.orderId,
            userId: req.userId
        }).populate('items.productId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Error fetching order' });
    }
});

module.exports = router;
