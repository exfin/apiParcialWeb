import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const modelSchema = new Schema({
  _id: {
    type: String, 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String, 
    required: true,
  },
  websiteLink: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true, 
    
  },
});

export default model('Model', modelSchema);
