
import eventModel from "../models/eventModel.js";


const getEvents = async (req, res) => {
  try {
    
    const events = await eventModel
      .find({})
      .populate('models', 'name profilePhoto')   
      .populate('makeup', 'name profilePhoto');  

    
    res.status(200).json(events);
  } catch (error) {
   
    console.log(error.message);
    res.status(500).json({ message: 'Error retrieving events', error: error.message });
  }
};



const addEvent = async (req, res) => {
  try {
    const { name, city, description, date, profilePhoto, models, makeup } = req.body;
    const newEvent = new eventModel({ name, city, description, date, profilePhoto, models, makeup });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding event', error: error.message });
  }
};

const getTopEvent = async (req, res) => {
  try {
    
    const topEvent = await eventModel.aggregate([
      { $sample: { size: 1 } }, 
      { $project: { _id: 1, name: 1, profilePhoto: 1, date: 1 } } 
    ]);

   
    if (topEvent.length === 0) {
      return res.status(404).json({ message: 'No event found' });
    }

    
    res.status(200).json(topEvent[0]);
  } catch (error) {
    
    res.status(500).json({ message: 'Error retrieving random event', error: error.message });
  }
};


export {getEvents, addEvent, getTopEvent};