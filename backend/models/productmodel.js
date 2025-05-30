const { Schema, model } = require('../connection');

const kitSchema = new Schema({
    kitName: { type: String, required: true },
    kitDescription: { type: String, required: true },
    kitPrice: { type: Number, required: true }
});

const productSchema = new Schema({
    name: { type: String, required: true },
    detail: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, default: 'Intermediate' },
    rating: { type: Number, default: 4.5 },
    featured: { type: Boolean, default: false },
    images: { type: [String] },
    video: { type: String },
    kits: { type: [kitSchema] } 
});

module.exports = model('product', productSchema);