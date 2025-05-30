const { Schema, model } = require('../connection');
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    city: { type: String, default:'unknown'},
    password: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = model('user', userSchema);