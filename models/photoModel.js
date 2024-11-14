import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const photoSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  modelId: {
    type: String, 
    ref: 'Model', 
    required: true,
  },
});

export default model('Photo', photoSchema);
