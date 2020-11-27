import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import bookRoute from './routes/bookRoute';
import faqRoute from './routes/faqRoute';
import orderRoute from './routes/OrderRoute';

// Middleware for express which provides data that the user enter in the post request into node application
import bodyParser from 'body-parser';

dotenv.config();
// const mongoose = require('mongoose');
// const mongodburl = config.MONGODB_URL;
const mongodburl = 'mongodb://localhost/BookFair'; 
mongoose.connect(mongodburl, {useNewUrlParser: true,
useUnifiedTopology:true,
useCreateIndex: true,
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json()); // 
app.use ("/api/users", userRoute);
app.use ("/api/items", bookRoute);
app.use ("/api/faqs", faqRoute);
app.use ("/api/orders", orderRoute);






// Static Server used initially to understand nodejs and making data.js file but with mongodb no need for this but for future reference


// app.get("/api/items/:id", (req, res)=>{
//     const bookID = req.params.id;
//     const book = data.items.find(x=>x._id==bookID);
//     if(book)
//         res.send(book);
//     else
//         res.status(404).send({msg: "Product not Found"})
// });


// // Second is handler function for response
// app.get("/api/items", (req, res)=>{

//     res.send(data.items);
// });


app.listen(5000, ()=>{console.log("Started at http://localhost:5000")}); 