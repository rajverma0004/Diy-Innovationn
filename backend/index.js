const express = require('express');
const app = express();
require('dotenv').config();
require('./connection');  // Add database connection
const port = 5000;

const cors = require('cors');


const userRouter = require('./routers/UserRouter');
const productRouter = require('./routers/productRouter');
const communitRouter = require('./routers/CommunityRouter');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/community', communitRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})