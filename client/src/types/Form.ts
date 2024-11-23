export interface SignUp{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface Login{
    email: string;
    password: string;
}

export interface CreateCourseData{
    courseTitle: string;
    category: string;
}