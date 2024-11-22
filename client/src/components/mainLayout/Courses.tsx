import { Card } from "@/types/Slice";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "../skeleton/CourseCard";

const Courses = () => {
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
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRLsQbcUzJ0CMvnH9iCht-OXo8sGTDGO3kQ&s",
      title: "Mern Stack",
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
        "https://i0.wp.com/blog.apitier.com/wp-content/uploads/2023/02/MERN_Stack.jpg?fit=560%2C315&ssl=1",
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

  const loading = false;

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold my-3 w-full text-center">
        Our Courses
      </h2>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {loading ? (
          <>
            <CourseCardSkeleton />
            <CourseCardSkeleton />
          </>
        ) : (
          courseData.map((item: Card, idx: number) => (
            <CourseCard key={idx} data={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;
