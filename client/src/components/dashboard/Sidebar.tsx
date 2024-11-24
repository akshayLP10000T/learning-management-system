import { ChartNoAxesColumn, HamIcon, SquareLibrary } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex relative">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r-2 border-r-gray-300 dark:border-r-gray-700 bg-gray-200 dark:bg-gray-800 h-screen py-5 px-2">
        <div className="space-y-4">
          <Link
            to={"/admin/dashboard"}
            replace
            className="flex gap-3 text-xl items-center"
          >
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link
            to={"/admin/courses"}
            replace
            className="flex gap-3 text-xl items-center"
          >
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
