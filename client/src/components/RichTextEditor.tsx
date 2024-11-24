import { Course } from "@/types/Slice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  courseData: Partial<Course>;
  setCourseData: React.Dispatch<React.SetStateAction<Partial<Course>>>;
}

const RichTextEditor = (props: Props) => {
  const handleChange = (e: any) => {
    props.setCourseData({ ...props.courseData, description: e });
  };

  return (
    <ReactQuill
      theme="snow"
      value={props.courseData?.description}
      onChange={handleChange}
    />
  );
};

export default RichTextEditor;
