require('dotenv').config()
const express = require('express');

const app = express();
const port = process.env.PORT;

const bodyParser = require('body-parser');
const connectDb = require('./config/dbConnection')
const { errorHandler } = require('./middleware/errorHandler');
const { default: mongoose } = require('mongoose');
const contactRoutes = require('./routes/contactRoutes')
const userRoutes = require('./routes/userRoutes');
//mongoose.connect("mongodb+srv://ajeet:12345@contactapi.t6jikmu.mongodb.net/mycontacts-backend")

connectDb();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(3000, ()=>{
    console.log(`server is running at 3000`)
})