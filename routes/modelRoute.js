import express from "express";
import { addModel, getAllModelsWithPhotos, getTopModel, getAllModels, updateModel, deleteaModel } from "../controllers/modelController.js";

const modelRouter = express.Router();

modelRouter.post('/add', addModel);
modelRouter.get('/getall&photos', getAllModelsWithPhotos);
modelRouter.get('/gettop', getTopModel);
modelRouter.get('/getall', getAllModels);
modelRouter.put('/edit/:id', updateModel); 
modelRouter.delete('/delete/:id', deleteaModel)
export default modelRouter;
