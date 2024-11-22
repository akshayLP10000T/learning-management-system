import { Card } from "@/types/Slice";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "../skeleton/CourseCard";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Learning = () => {
  const loading = false;
  const { user } = useSelector((store: RootState)=> store.user);

  return (
    <div className="px-5">
      <h1 className="uppercase text-5xl font-extrabold p-5">My learning</h1>
      {user?.enrolledCourses.length === 0 ? (
        <>
          <h2 className="pl-5 text-lg">You didn't buy any course</h2>
          <Button variant={"outline"} className="ml-5 mt-3 rounded-full border-blue-400 dark:border-blue-900">Browse Courses</Button>
        </>
      ) : loading ? (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <>
            <CourseCardSkeleton />
            <CourseCardSkeleton />
          </>
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {user?.enrolledCourses.map((item: Card) => (
            <CourseCard key={item._id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Learning;
