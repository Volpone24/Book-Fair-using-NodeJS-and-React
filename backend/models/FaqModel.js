import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    
  });
  
  const FaqModel = mongoose.model('FAQ', FaqSchema);
  
  export default FaqModel;