import express from 'express';
import { login, signUp, updateProfile } from '../controllers/user';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import upload from '../utils/multer';

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

export default router;