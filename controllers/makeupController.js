import makeupModel from "../models/makeupModel.js";

const addMakeup = async (req, res) => {
    try {
      const { _id, name, description, profilePhoto, price } = req.body;
      const newMakeup = new makeupModel({ _id, name, description, profilePhoto, price });
      const savedMakeup = await newMakeup.save();
      res.status(201).json(savedMakeup);
    } catch (error) {
      res.status(500).json({ message: 'Error adding makeup', error: error.message });
    }
};

const getAllMakeups = async (req, res) => {
    try {
      // Fetch all makeups from the database
      const makeups = await makeupModel.find().select('name description profilePhoto price');
      // Return the makeups as a JSON response
      res.status(200).json(makeups);
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: 'Error retrieving makeups', error: error.message });
    }
  };



export {addMakeup, getAllMakeups};