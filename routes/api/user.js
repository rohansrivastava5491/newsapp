import express from 'express';
import { Router } from 'express';
const router = Router();
import { loginController, registerController, verifyToken } from '../../controllers/auth.js';
router.use(express.json())
router.get('/test',(req,res)=>res.send('User route testing'));
router.post('/register',registerController);
router.post('/login',loginController);
router.get('/verify',verifyToken);



export default router;