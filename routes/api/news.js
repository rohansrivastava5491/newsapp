import express from "express";
import {Router} from "express";
import { articleController } from "../../controllers/news.js";
const router = Router();
router.use(express.json())
router.get('/sortBy:sortBy/from:from/to:to/querry:querry', articleController);
export default router;