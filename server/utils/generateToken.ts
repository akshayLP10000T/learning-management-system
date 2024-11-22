import { Response } from "express";
import { UserDocument } from "../types/user";
import jwt from 'jsonwebtoken';

export const generateToken = (res: Response, user: UserDocument)=>{
    const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY!);

    return res.status(200).cookie("token", token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24*60*60*1000,
    });
}