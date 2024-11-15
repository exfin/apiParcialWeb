import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectionDB } from "./config/database.js";
import eventRouter from "./routes/eventRoute.js";
import makeupRouter from "./routes/makeupRoute.js";
import modelRouter from "./routes/modelRoute.js";
import photoRouter from "./routes/photoRoute.js";

const PORT = process.env.PORT || 8080
const app = express()
const corsOptions = {
  origin: "*", 
  methods: ["POST", "GET", "PUT", "DELETE"], 
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions))
app.use(express.json());

connectionDB().catch(error => console.error('Failed to connect to MongoDB:', error.message));

app.use('/api/event', eventRouter);
app.use('/api/makeup', makeupRouter);
app.use('/api/model', modelRouter);
app.use('/api/photo', photoRouter);

console.log('Hola');

app.listen(PORT,()=>{console.log(`Corriendo en el localHost:${PORT}`)})