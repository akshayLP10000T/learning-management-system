import { Request, Response } from "express";
import { Course } from "../models/course";
import { User } from "../models/user";
import { deleteMedia, uploadMedia } from "../utils/cloudinary";

export const createCourse = async (req: Request, res: Response): Promise<any> => {
    try {

        const { courseTitle, category } = req.body;
        const userId = req.id;

        if (!courseTitle || !category) {
            return res.status(404).json({
                success: false,
                message: "Course title and category is required",
            });
        }

        const user = await User.findById(userId).select("role");

        if (user?.role !== "INSTRUCTOR") {
            return res.status(401).json({
                success: false,
                message: "You doesn't have access to create courses",
            });
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: userId,
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfullly",
            course,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

}

export const getAllInstructorCourses = async (req: Request, res: Response): Promise<any> => {
    try {

        const userId = req.id;
        const courses = await Course.find({ creator: userId });

        if (!courses) {
            return res.status(404).json({
                courses: [],
                success: true,
            });
        }

        return res.status(200).json({
            courses,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const editCourse = async (req: Request, res: Response): Promise<any> => {
    try {

        const { courseId } = req.params;
        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
        const thumbnail = req.file;

        let course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                success: false,
            });
        }

        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split("/").pop()?.split(".")[0];
                await deleteMedia(publicId!);
            }
            const res = await uploadMedia(thumbnail.path);

            courseThumbnail = res?.secure_url;
        }
        else {
            courseThumbnail = null;
        }

        course = await Course.findByIdAndUpdate(courseId, {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            courseThumbnail,
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Course Updated",
            course
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}