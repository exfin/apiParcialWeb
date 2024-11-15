import express from "express";
import { addMakeup, getAllMakeups, getTopMakeup, updateMakeup, deleteMakeup, getAllMakeupsComplete } from "../controllers/makeupController.js";

const makeupRouter = express.Router();

makeupRouter.post('/add', addMakeup);
makeupRouter.get('/getall', getAllMakeups);
makeupRouter.get('/getallComplete', getAllMakeupsComplete); 
makeupRouter.get('/gettop', getTopMakeup);
makeupRouter.put('/edit/:id', updateMakeup); 
makeupRouter.delete('/delete/:id', deleteMakeup); 

export default makeupRouter;
