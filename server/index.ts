import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './database/connectDB';
import userRoute from './routes/user';

dotenv.config({});

const PORT = process.env.PORT;
const app = express();
const corsOption = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

app.use("/api/v1/user", userRoute);

app.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Server listening to port ${PORT}`);
});