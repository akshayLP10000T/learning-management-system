import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateCourseData } from "@/types/Form";
import { createCourseApi } from "@/utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [addCourseData, setAddCourseData] = useState<CreateCourseData>({
    courseTitle: "",
    category: "",
  });

  const navigate = useNavigate();

  const createCourseHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createCourseApi(addCourseData, navigate, setAddCourseData);
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Add a course and earn</h2>
        <h3 className="text-lg text-gray-500">
          To add a course first fill some basic details...
        </h3>
      </div>
      <form className="space-y-2 mt-6" onSubmit={(e) => createCourseHandler(e)}>
        <div>
          <Label htmlFor="courseTitle">Title</Label>
          <Input
            value={addCourseData.courseTitle}
            onChange={(e) =>
              setAddCourseData({
                ...addCourseData,
                courseTitle: e.target.value,
              })
            }
            name="couseTitle"
            placeholder="Your course title"
          />
        </div>
        <div>
          <Label htmlFor="courseCategory">Category</Label>
          <Select
          value={addCourseData.category}
            onValueChange={(e) =>
              setAddCourseData({ ...addCourseData, category: e })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Backend Development">
                  Backend Development
                </SelectItem>
                <SelectItem value="MERN">MERN</SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="AWS">AWS</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="gap-2 flex pt-3">
          <Button
            onClick={() => navigate("/admin/courses", { replace: true })}
            variant={"outline"}
          >
            Back
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
