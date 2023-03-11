import express from "express";
const router = express.Router(); // express.js Router özelliği
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from "../middleware/authMiddleware.js";


router.post('/login', authUser)  // /api/users/login

router.route('/profile').get(protect, getUserProfile);

export default router;  
