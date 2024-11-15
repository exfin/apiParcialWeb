
import eventModel from "../models/eventModel.js";

// Function to retrieve all events
const getEvents = async (req, res) => {
  try {
    // Fetch all events from the database and populate additional fields for 'models' and 'makeup'
    const events = await eventModel
      .find({})
      .populate('models', 'name profilePhoto')   // Populate 'models' with 'name' and 'profilePhoto'
      .populate('makeup', 'name profilePhoto');  // Populate 'makeup' with 'name' and 'profilePhoto'

    // Return the populated events as a JSON response
    res.status(200).json(events);
  } catch (error) {
    // Handle any errors that occur
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
    // MongoDB aggregation pipeline to get a random event with selected fields
    const topEvent = await eventModel.aggregate([
      { $sample: { size: 1 } }, // Select one random document
      { $project: { _id: 1, name: 1, profilePhoto: 1, date: 1 } } // Only include specified fields
    ]);

    // Check if an event was found
    if (topEvent.length === 0) {
      return res.status(404).json({ message: 'No event found' });
    }

    // Return the random event as a JSON response
    res.status(200).json(topEvent[0]);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: 'Error retrieving random event', error: error.message });
  }
};


export {getEvents, addEvent, getTopEvent};