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
      
      const makeups = await makeupModel.find().select('name description profilePhoto price');
      
      res.status(200).json(makeups);
    } catch (error) {
      
      res.status(500).json({ message: 'Error retrieving makeups', error: error.message });
    }
  };

  const getTopMakeup = async (req, res) => {
    try {
      const topMakeup = await makeupModel.aggregate([
        { $sample: { size: 1 } },
        { $project: { _id: 1, name: 1, description: 1, profilePhoto: 1 } }
      ]);
  
      if (topMakeup.length === 0) {
        return res.status(404).json({ message: 'No makeup found' });
      }
  
      res.status(200).json(topMakeup[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving random makeup', error: error.message });
    }
  };

  const getAllMakeupsComplete = async (req, res) => {
    try {
        
        const makeups = await makeupModel.find();
       
        res.status(200).json(makeups);
    } catch (error) {
        
        res.status(500).json({ message: 'Error retrieving makeups', error: error.message });
    }
};

const updateMakeup = async (req, res) => {
  const { id } = req.params;
  const { name, description, profilePhoto, price } = req.body;

  try {
      const updatedMakeup = await makeupModel.findByIdAndUpdate(
          id,
          { name, description, profilePhoto, price },
          { new: true }
      );

      if (!updatedMakeup) {
          return res.status(404).json({ message: "Makeup not found" });
      }

      res.status(200).json(updatedMakeup);
  } catch (error) {
      res.status(500).json({ message: 'Error updating makeup', error: error.message });
  }
};

// Delete Makeup
const deleteMakeup = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedMakeup = await makeupModel.findByIdAndDelete(id);

      if (!deletedMakeup) {
          return res.status(404).json({ message: "Makeup not found" });
      }

      res.status(200).json({ message: "Makeup deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting makeup', error: error.message });
  }
};


export {addMakeup, getAllMakeups, getTopMakeup, getAllMakeupsComplete, updateMakeup, deleteMakeup};