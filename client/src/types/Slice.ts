export interface UserState{
    user: User | null;
}

export interface courseState{
    courses: Course[] | [];
}

export interface User{
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    enrolledCourses: Card[] | [];
    photoUrl: string | null;
    updatedAt: Date;
    createdAt: Date;
    __v: number;
}

export interface Course{
    _id: string;
    courseTitle: string;
    subTitle: string;
    description: any;
    category: string;
    courseLevel: string;
    coursePrice: number;
    thumbnail: File | null;
    enrolledStudents: Partial<User>;
    lectures: []; // Change after making lecture interface
    creator: Partial<User>;
    isPublished: boolean;
}

// To be deleted after showing courses
export interface Card{
    _id: string;
    image: string;
    title: string;
    instructure: Partial<User>;
    level: string;
    price: number;
    updatedAt: Date;
    createdAt: Date;
    __v: number;
}