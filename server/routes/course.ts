import express from 'express';
import { createCourse } from '../controllers/course';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.route("/").post(isAuthenticated ,createCourse);

export default router;