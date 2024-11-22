import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generateToken";
import { deleteMedia, uploadMedia } from "../utils/cloudinary";

export const signUp = async (req: Request, res: Response): Promise<any> => {
    try {

        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Check all fields",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password doesn't match",
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "E-mail already taken",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully, login to continue...",
        });

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Check all fields",
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        generateToken(res, user);

        user = await User.findOne({ email }).select("-password");

        return res.status(200).json({
            success: true,
            message: `Welcome back ${user?.name}`,
            user,
        });

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const logout = async (_: Request, res: Response): Promise<any>=>{
    try {

        return res.clearCookie('token').status(200).json({
            success: true,
            message: "logged out successfully",
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const updateProfile = async (req: Request, res: Response): Promise<any> => {
    try {

        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.photoUrl) {
            const publicId = user.photoUrl.split("/").pop()?.split(".")[0];
            deleteMedia(publicId!);
        }

        let updatedData;

        if(profilePhoto){
            const cloudResponse = await uploadMedia(profilePhoto?.path!);
            updatedData = {
                name,
                photoUrl: cloudResponse?.secure_url,
            };
        }
        else{
            updatedData = {
                name
            }
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
            new: true,
        }).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user: updatedUser,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}