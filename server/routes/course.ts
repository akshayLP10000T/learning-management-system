import express from 'express';
import { createCourse, editCourse, getAllInstructorCourses } from '../controllers/course';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import upload from '../utils/multer';

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getAllInstructorCourses);
router.route("/:courseId").put(isAuthenticated, upload.single("thumbnail"), editCourse);

export default router;