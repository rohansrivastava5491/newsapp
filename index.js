import express, { json } from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();


import user from './routes/api/user.js';
import news from './routes/api/news.js';
const app = express();
app.use(cors());
app.use('/api/v1/auth',user);
app.use('/',news);
app.options('*', cors());

connectDB();



const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));