import express from 'express';
import { login, profileData, signUp } from '../controllers/user';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/profile").get(isAuthenticated, profileData);

export default router;