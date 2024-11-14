import express from "express";
import { addPhoto, getAllPhotos } from "../controllers/photoController.js";

const photoRouter = express.Router();

photoRouter.post('/add', addPhoto);
photoRouter.get('/getall', getAllPhotos);

export default photoRouter;