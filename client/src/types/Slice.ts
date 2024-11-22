export interface UserState{
    user: User | null;
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
    _v: number;
}

export interface Card{
    image: string;
    title: string;
    instructure: Partial<User>;
    level: string;
    price: number;
}