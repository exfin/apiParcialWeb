import express from "express";
import { addModel, getAllModelsWithPhotos } from "../controllers/modelController.js";

const modelRouter = express.Router();

modelRouter.post('/add', addModel);
modelRouter.get('/getall&photos', getAllModelsWithPhotos);

export default modelRouter;