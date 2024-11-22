import { Card } from "@/types/Slice";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "../skeleton/CourseCard";
import { Button } from "../ui/button";

const Learning = () => {
  const loading = false;
  const courseData: Card[] = [
    {
      image:
        "https://images.prismic.io/loco-blogs/79328284-f97b-489f-924c-eb3b17e34b56_image2.png?auto=compress%2Cformat&rect=0%2C0%2C1999%2C1124&w=1920&h=1080&ar=1.91%3A1",
      title: "Mern Stack-Series by Akshay Sharma basic to advance",
      instructure: {
        name: "Akshay Sharma",
        photoUrl:
          "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
      },
      level: "Advance",
      price: 124,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO9PTVxYRWcCwvwJr2zcwoToKWchVBSKwkEg&s",
      title: "Mern Stack",
      instructure: {
        name: "Akshay Sharma",
        photoUrl:
          "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
      },
      level: "Advance",
      price: 124,
    },
  ];
  return (
    <div className="px-5">
      <h1 className="uppercase text-5xl font-extrabold p-5">My learning</h1>
      {courseData.length === 0 ? (
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
          {courseData.map((item: Card, idx: number) => (
            <CourseCard key={idx} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Learning;
