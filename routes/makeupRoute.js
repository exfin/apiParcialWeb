import express from "express";
import { addMakeup, getAllMakeups } from "../controllers/makeupController.js";

const makeupRouter = express.Router();

makeupRouter.post("/add", addMakeup );
makeupRouter.get("/getall", getAllMakeups);


export default makeupRouter;