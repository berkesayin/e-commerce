import express from "express";
const router = express.Router(); // express.js Router özelliği
import { authUser, registerUser, getUserProfile } from '../controllers/userController.js'
import { protect } from "../middleware/authMiddleware.js";


router.route('/').post(registerUser);    // => POST /api/users
router.post('/login', authUser)          // => POST /api/users/login
router.route('/profile').get(protect, getUserProfile);   // => GET /api/users/profile

export default router;  
