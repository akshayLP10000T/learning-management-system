import { Course, courseState } from "@/types/Slice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initial state
const initialState: courseState = {
    courses: [],
};

// Creating the slice
const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        // Define the setUser reducer with a typed action payload
        setCourses: (state, action: PayloadAction<Course[] | []>) => {
            state.courses = action.payload;
        },
    },
});

// Exporting actions and userSlice reducer for storing
export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;