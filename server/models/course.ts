import mongoose from "mongoose";
import { CourseDocument } from "../types/course";

const courseSchema = new mongoose.Schema<CourseDocument>({

    courseTitle: {
        type: String,
        required: true,
    },
    subTitle: String,
    description: String,
    category: {
        type: String,
        required: true
    },
    courseLevel: {
        type: String,
        enum: ["Begineer", "Intermediate", "Advance"],
    },
    coursePrice: {
        type: Number,
    },
    courseThumbnail: String || null,
    enrolledStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lecture',
        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },

}, {timestamps: true});

export const Course = mongoose.model("Course", courseSchema);