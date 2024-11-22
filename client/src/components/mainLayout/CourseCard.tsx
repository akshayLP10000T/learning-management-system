import { Card } from "@/types/Slice";
import { Badge } from "../ui/badge";
import { IndianRupee } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  data: Card;
}

const CourseCard = (props: Props) => {
  return (
    <div className="w-full rounded-md overflow-hidden hover:scale-105 transition-all dark:bg-gray-800 bg-gray-100 shadow-sm hover:shadow-xl">
      <img
        className="w-full h-64 object-cover"
        src={props.data.image}
        alt="img"
      />
      <div className="p-3">
        <h2
          className="text-2xl font-bold truncate mb-2"
          title={props.data.title}
        >
          {props.data.title}
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Avatar>
              <AvatarImage src={props.data.instructure.photoUrl} />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <p className="text-lg">{props.data.instructure.name}</p>
          </div>
          <Badge className="dark:bg-blue-900 bg-blue-600 hover:dark:bg-blue-800 hover:bg-blue-700 cursor-pointer text-white">
            {props.data.level}
          </Badge>
        </div>
        <p className="flex mt-3 font-bold items-center text-xl">
          <IndianRupee />
          {props.data.price}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
