import express from "express";
import { getEvents, addEvent, getTopEvent } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.get("/getall", getEvents);
eventRouter.post("/add", addEvent);
eventRouter.get("/gettop", getTopEvent);


export default eventRouter;