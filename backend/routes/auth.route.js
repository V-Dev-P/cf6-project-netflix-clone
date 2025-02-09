import express from 'express';
import { authCheck, login, logout, signup } from '../controllers/auth.controller.js';
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// defining routes for signup, login, logout
router.post ("/signup", signup);
router.post ("/login", login);
router.post ("/logout", logout);

//protectRoute middleware to protect authCheck route
router.get  ("/authCheck", protectRoute, authCheck);

export default router;