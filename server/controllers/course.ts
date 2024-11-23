import { Request, Response } from "express";
import { Course } from "../models/course";
import { User } from "../models/user";

export const createCourse = async (req: Request, res: Response): Promise<any>=>{
    try {

        const { courseTitle, category } = req.body;
        const userId = req.id;

        if(!courseTitle || !category){
            return res.status(404).json({
                success: false,
                message: "Course title and category is required",
            });
        }

        const user = await User.findById(userId).select("role");

        if(user?.role !== "INSTRUCTOR"){
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