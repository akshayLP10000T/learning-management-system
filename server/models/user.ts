import mongoose from "mongoose";
import { UserDocument } from "../types/user";

const userSchema = new mongoose.Schema<UserDocument>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['STUDENT', 'INSTRUCTOR'],
        default: 'STUDENT',
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
    ],
    photoUrl: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);