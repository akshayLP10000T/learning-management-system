import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generateToken";

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

        user = await User.findOne({email}).select("-password");

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

export const profileData = async (req: Request, res: Response): Promise<any>=>{
    try {

        const userId = req.id;

        const user = await User.findById(userId).select("email _id name role enrolledCourses photoUrl");

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Some error occured while finding user",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}