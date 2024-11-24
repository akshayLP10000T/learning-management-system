import express from 'express';
import { createCourse, getAllInstructorCourses } from '../controllers/course';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getAllInstructorCourses);

export default router;