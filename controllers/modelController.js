import { model } from "mongoose";
import modelModel from "../models/modelModel.js";
import photoModel from "../models/photoModel.js";

const addModel = async (req, res) => {
    try {
      const { _id, name, description, profilePhoto, websiteLink, email } = req.body;
      const newModel = new modelModel({ _id, name, description, profilePhoto, websiteLink, email });
      const savedModel = await newModel.save();
      res.status(201).json(savedModel);
    } catch (error) {
      res.status(500).json({ message: 'Error adding model', error: error.message });
    }
};

 const getAllModelsWithPhotos = async (req, res) => {
    try {
      // Find all models, selecting name, description, and profilePhoto fields
      const models = await modelModel.find().select('name description profilePhoto');
  
      // Retrieve associated photos for each model
      const modelsWithPhotos = await Promise.all(
        models.map(async (model) => {
          const photos = await photoModel.find({ modelId: model._id }).select('url');
          return { 
            _id: model._id,
            name: model.name,
            description: model.description,
            profilePhoto: model.profilePhoto,
            photos 
          };
        })
      );
  
      // Return the list of models with their associated photos
      res.status(200).json(modelsWithPhotos);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving models and photos', error: error.message });
    }
  };

  const getTopModel = async (req, res) => {
    try {
      const topModel = await modelModel.aggregate([
        { $sample: { size: 1 } },
        { $project: { _id: 1, name: 1, description: 1, profilePhoto: 1 } }
      ]);
  
      if (topModel.length === 0) {
        return res.status(404).json({ message: 'No model found' });
      }
  
      res.status(200).json(topModel[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving random model', error: error.message });
    }
  };

  const getAllModels = async (req, res) => {
    try {
        // Retrieve all models from the database
        const models = await modelModel.find();

        // Return all models as a JSON response
        res.status(200).json(models);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Error retrieving models', error: error.message });
    }
};

const updateModel = async (req, res) => {
  const { id } = req.params; // Extract model ID from the route parameters
  const { name, description, profilePhoto, websiteLink, email } = req.body; // Extract fields to update from the request body

  try {
      // Find and update the model with the provided data
      const updatedModel = await modelModel.findByIdAndUpdate(
          id,
          { name, description, profilePhoto, websiteLink, email },
          { new: true, runValidators: true } // Options: return the updated document and validate data
      );

      if (!updatedModel) {
          return res.status(404).json({ message: "Model not found" });
      }

      // Return the updated model
      res.status(200).json(updatedModel);
  } catch (error) {
      // Handle any errors
      console.log(error.message);
      res.status(500).json({ message: "Error updating model", error: error.message });
  }
};

const deleteaModel = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedModel = await modelModel.findByIdAndDelete(id);

      if (!deletedModel) {
          return res.status(404).json({ message: "Model not found" });
      }

      res.status(200).json({ message: "Model deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting model", error: error.message });
  }
};


export{addModel, getAllModelsWithPhotos, getTopModel, getAllModels, updateModel, deleteaModel};