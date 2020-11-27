import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    count: { type: Number,default:0, required: true },
    cost: { type: String,default: 100, required: true },
    description: { type: String, required: true },
    rating: { type: Number,default:0, required: true },
    numReview: { type: Number, default: 0, required: true },
  });
  
  const bookModel = mongoose.model('Book', bookSchema);
  
  export default bookModel;