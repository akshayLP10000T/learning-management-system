import mongoose, { Document } from "mongoose";

interface User{
    name: string;
    email: string;
    password: string;
    role: string;
    enrolledCourses: mongoose.Schema.Types.ObjectId[] | [];
    photoUrl: string | null;
}

export interface UserDocument extends User, Document{
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}