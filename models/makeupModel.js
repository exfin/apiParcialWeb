import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const makeupSchema = new Schema({
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
  price: {
    type: Number,
    required: true,
  },
});

export default model('Makeup', makeupSchema);
