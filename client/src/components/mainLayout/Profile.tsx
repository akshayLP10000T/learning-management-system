import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import CourseCard from "./CourseCard";
import { Card } from "@/types/Slice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="md:p-20 p-5">
      <div className="flex md:flex-row flex-col md:gap-20 items-center gap-16">
        <div>
          <h2 className="uppercase text-3xl font-bold">profile</h2>
          <Avatar className="w-24 h-24 mt-2">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="flex gap-3">
            <h3 className="font-bold">Name:</h3>
            <p>{user?.name}</p>
          </div>
          <div className="flex gap-3">
            <h3 className="font-bold">Email:</h3>
            <p>{user?.email}</p>
          </div>
          <div className="flex gap-3">
            <h3 className="font-bold">Role:</h3>
            <p>{user?.role}</p>
          </div>
        </div>
        <div>
          <Button>Edit Profile</Button>
        </div>
      </div>
      {user?.enrolledCourses.length !== 0 ? (
        <>
          <div className="mt-9">
            <h3 className="font-bold text-2xl">Courses you're enrolled in</h3>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
              {user?.enrolledCourses.map((item: Card, idx: number) => (
                <CourseCard key={idx} data={item} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <h3 className="mt-8 font-bold text-xl">
          You didn't enrolled in any course
        </h3>
      )}
    </div>
  );
};

export default Profile;
