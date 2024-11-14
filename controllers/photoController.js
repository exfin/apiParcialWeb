import photoModel from "../models/photoModel.js";

const addPhoto = async (req,res) =>{
    try{
        const {url, modelId} = req.body;
        const newPhoto = new photoModel({url, modelId});
        const savedPhoto = await newPhoto.save();
        res.status(201).json(savedPhoto);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding photo', error: error.message });
    }

};

const getAllPhotos = async (req, res) => {
    try {
      // Fetch all photos from the database
      const photos = await photoModel.find().select('url modelId');
      // Return the photos as a JSON response
      res.status(200).json(photos);
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: 'Error retrieving photos', error: error.message });
    }
  };

export {addPhoto, getAllPhotos};