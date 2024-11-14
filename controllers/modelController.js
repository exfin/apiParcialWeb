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

export{addModel, getAllModelsWithPhotos};