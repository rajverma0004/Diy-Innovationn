const mongoose = require('mongoose');
require('dotenv').config();
const url = "mongodb+srv://rajsrivastava0004:abhimesh@cluster0.svhqq.mongodb.net/diyInnovation?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(url)
.then((result) => {
    console.log('connected to the database');
    
}).catch((err) => {
    console.log(err);
});
module.exports = mongoose;