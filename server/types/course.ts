import mongoose, { Document } from "mongoose";

interface Course{
    courseTitle: string;
    subTitle: string | null;
    description: string | null;
    category: string;
    courseLevel: string;
    coursePrice: number;
    courseThumbnail: string | null;
    enrolledStudents: mongoose.Schema.Types.ObjectId[] | [];
    lectures: mongoose.Schema.Types.ObjectId[] | [];
    creator: mongoose.Schema.Types.ObjectId;
    isPublished: boolean;
}

export interface CourseDocument extends Course, Document{
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}