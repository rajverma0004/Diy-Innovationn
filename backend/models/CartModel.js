const { Schema, model } = require('../connection');

const cartItemSchema = new Schema({
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'product',
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true,
        min: 1 
    }
});

const cartSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: true 
    },
    items: [cartItemSchema],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Update the updatedAt timestamp before saving
cartSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = model('cart', cartSchema);
