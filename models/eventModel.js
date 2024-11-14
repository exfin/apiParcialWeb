import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  profilePhoto: {
    type: String, 
    required: true,
  },
  models: [{
    type: String, 
    ref: 'Model', 
    required: true,
  }],
  makeup: [{
    type: String, 
    ref: 'Makeup', 
    required: true,
  }],
});

export default model('Event', eventSchema);
