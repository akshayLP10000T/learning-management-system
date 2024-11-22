import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import CourseCard from "./CourseCard";
import { Card } from "@/types/Slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { updateApi } from "@/utils/api";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [name, setName] = useState<string | undefined>(user?.name);
  const [profilePhoto, setProfilePhoto] = useState<string | File>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();

    formData.append("name", name!);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    await updateApi(formData, dispatch, setLoading);

    setName(user?.name);
    setProfilePhoto("");
    setOpen(false);
  };

  return (
    <div className="md:p-20 p-5">
      <div className="flex md:flex-row flex-col md:gap-20 items-center gap-16">
        <div>
          <h2 className="uppercase text-3xl font-bold">profile</h2>
          <Avatar className="w-24 h-24 mt-2">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
        </div>
        <div className="grid">
          <div className="flex gap-3 items-center">
            <h3 className="font-bold">Name:</h3>
            <p>{user?.name}</p>
          </div>
          <div className="flex gap-3 items-center">
            <h3 className="font-bold">Email:</h3>
            <p>{user?.email}</p>
          </div>
          <div className="flex gap-3 items-center">
            <h3 className="font-bold">Role:</h3>
            <p>{user?.role}</p>
          </div>
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="profilePhoto" className="text-right">
                    Profile Photo
                  </Label>
                  <Input
                    type="file"
                    className="col-span-3"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={(e) => fileChangeHandler(e)}
                  />
                </div>
              </div>
              <DialogFooter>
                {loading ? (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    Please Wait...
                  </Button>
                ) : (
                  <Button onClick={updateUserHandler}>Save changes</Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
