import { toast } from "sonner"
import axios from 'axios';
import { CreateCourseData, Login, SignUp } from "@/types/Form";
import { AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/userSlice";
import { NavigateFunction } from "react-router-dom";

export const SignUpApi = async (data: SignUp, setLoading: Function) => {
    try {

        setLoading(true);

        const res = await axios.post("http://localhost:8080/api/v1/user/signup", data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        if (res.data.success) {
            toast.success(res.data.message);
        }

    } catch (error: any) {
        toast.error(error.response.data.message);
    }
    finally {
        setLoading(false);
    }
}

export const LoginApi = async (data: Login, dispatch: AppDispatch, setLoading: Function) => {
    try {

        setLoading(true);

        const res = await axios.post("http://localhost:8080/api/v1/user/login", data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        if (res.data.success) {
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
        }

    } catch (error: any) {
        toast.error(error.response.data.message);
    }
    finally {
        setLoading(false);
    }
}

export const logoutApi = async (dispatch: AppDispatch) => {
    try {

        const res = await axios.get("http://localhost:8080/api/v1/user/logout", {
            withCredentials: true,
        });

        if (res.data.success) {
            dispatch(setUser(null));
            toast.success(res.data.message);
        }

    } catch (error: any) {
        toast.error(error.response.data.message);
    }
}

export const updateApi = async (data: FormData, dispatch: AppDispatch, setLoading: Function) => {
    try {

        setLoading(true);
        const res = await axios.put("http://localhost:8080/api/v1/user/profile/update", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });

        if (res.data.success) {
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
        }
    }
    catch (error: any) {
        toast.error(error.response.data.message);
        console.log(error);
    }
    finally {
        setLoading(false);
    }
}

export const getUserDataApi = async (dispatch: AppDispatch) => {
    try {

        const res = await axios.get("http://localhost:8080/api/v1/user/user-data", {
            withCredentials: true,
        });

        if (res.data.success) {
            dispatch(setUser(res.data.user));
        }
        else {
            dispatch(setUser(null));
        }

    } catch (error: any) {
        console.log(error);
        toast.error(error?.response.data.message);
    }
}

export const createCourseApi = async (data: CreateCourseData, navigate: NavigateFunction, setAddCourseData: Function) => {
    try {

        const res = await axios.post("http://localhost:8080/api/v1/course/", data, {
            withCredentials: true,
        });

        if (res.data.success) {
            navigate("/admin/courses", { replace: true });
            setAddCourseData({
                courseTitle: "",
                category: "",
            });
            toast.success(res.data.message);
        }

    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
}