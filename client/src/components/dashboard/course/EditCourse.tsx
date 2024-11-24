import { useNavigate } from "react-router-dom"
import CourseTab from "./CourseTab";

const EditCourse = () => {
    const navigate = useNavigate();

  return (
    <div>
        <div className="flex items-center justify-between mb-5 gap-7 flex-wrap">
            <h2 className="text-xl font-bold">Add detail information regarding course</h2>
            <h3 onClick={()=>navigate("/admin/course/:id/lecture")} className="hover:underline cursor-pointer">Go to lecture page</h3>
        </div>
        <CourseTab />
    </div>
  )
}

export default EditCourse