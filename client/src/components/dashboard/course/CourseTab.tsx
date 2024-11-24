import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Course } from "@/types/Slice";
import { updateCourse } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseTab = () => {
  const isPublished = true;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const { courseId } = useParams();

  const courseDataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData({
      ...courseData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const [courseData, setCourseData] = useState<Partial<Course>>({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: 0,
    thumbnail: null,
  });

  const [previewThumbnail, setPreviewThumbnail] = useState<any>("");

  const selectThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCourseData({ ...courseData, thumbnail: file });

      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const courseSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateCourse(courseId!, courseData, setLoading);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div>
            <CardTitle>Basic Course Information</CardTitle>
            <CardDescription>
              Make changes to your course and click save when you are done
            </CardDescription>
          </div>
          <div className="gap-2 flex">
            <Button variant={"outline"}>
              {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button>Remove Course</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-2" onSubmit={(e) => courseSubmitHandler(e)}>
          <div>
            <Label htmlFor="courseTitle">Title</Label>
            <Input
              name="courseTitle"
              id="courseTitle"
              placeholder="Enter Title"
              value={courseData?.courseTitle}
              onChange={(e) => courseDataChangeHandler(e)}
            />
          </div>
          <div>
            <Label htmlFor="subTitle">Sub Title</Label>
            <Input
              name="subTitle"
              id="subTitle"
              placeholder="Enter Sub Title"
              value={courseData?.subTitle}
              onChange={(e) => courseDataChangeHandler(e)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              courseData={courseData}
              setCourseData={setCourseData}
            />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <div>
              <Label htmlFor="courseCategory">Category</Label>
              <Select
                value={courseData.category}
                onValueChange={(e) =>
                  setCourseData({ ...courseData, category: e })
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
            <div>
              <Label htmlFor="courseLevel">Course Level</Label>
              <Select
                value={courseData.courseLevel}
                onValueChange={(e) =>
                  setCourseData({ ...courseData, courseLevel: e })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Levels</SelectLabel>
                    <SelectItem value="Begineer">Begineer</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="coursePrice">Price</Label>
              <Input
                name="coursePrice"
                id="coursePrice"
                value={courseData?.coursePrice}
                type="number"
                onChange={(e) => courseDataChangeHandler(e)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <Input
              onChange={(e) => selectThumbnail(e)}
              type="file"
              accept="image/*"
              className="w-fit"
              name="thumbnail"
              id="thumbnail"
            />
          </div>
          {previewThumbnail && (
            <img className="max-w-[250px]" src={previewThumbnail} alt="img" />
          )}
          <div className="flex gap-2">
            <Button
              onClick={() => navigate("/admin/courses")}
              variant={"outline"}
            >
              Back
            </Button>
            {loading ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please Wait...
              </Button>
            ) : (
              <Button type="submit">Save</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
