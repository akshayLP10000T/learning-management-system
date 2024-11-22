import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({});

cloudinary.config({
    api_key: process.env.API_KEY,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.API_SECRET,
});

export const uploadMedia = async (file: string)=>{
    try {
        
        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        });

        return uploadResponse;
        
    } catch (error) {

        console.log(error);
        
    }
}

export const deleteMedia = async (publicId: string)=>{
    try {
        
        await cloudinary.uploader.destroy(publicId);

    } catch (error: any) {
        console.log(error);
    }
}

export const deleteVideo = async (publicId: string)=>{
    try {
        
        await cloudinary.uploader.destroy(publicId, {
            resource_type: 'video',
        });

    } catch (error: any) {
        console.log(error);
    }
}