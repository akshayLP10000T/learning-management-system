import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllInstructorCourses } from "@/utils/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Courses = () => {

  const dispatch: AppDispatch = useDispatch();

  const { courses } = useSelector((store: RootState)=>store.courses);

  useEffect(()=>{
    const getAllCourses = async ()=>{
      await getAllInstructorCourses(dispatch);
    }

    getAllCourses();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="space-y-6 px-5">
      <Button onClick={() => navigate("/admin/add-course", { replace: true })}>
        Add a new course
      </Button>
      <Table>
        <TableCaption>A list of your Courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course?._id}>
              <TableCell className="font-medium">{course?.coursePrice ? course?.coursePrice : "NA"}</TableCell>
              <TableCell className={`${course?.isPublished ? "text-green-500" : "text-red-500 font-bold"}`}>{course?.isPublished ? "Published" : "Draft"}</TableCell>
              <TableCell>{course?.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button variant={"outline"}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Courses;
