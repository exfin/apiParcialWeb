import express from "express";
import { getEvents, addEvent } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.get("/getall", getEvents);
eventRouter.post("/add", addEvent);

export default eventRouter;