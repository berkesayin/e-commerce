import express from "express";
const router = express.Router(); // express.js Router özelliği
import { authUser } from '../controllers/userController.js'


router.post('/login', authUser)  // /api/users/login


export default router;  
