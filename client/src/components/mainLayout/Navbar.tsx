import { Book, House, LogOut, Menu, PenBoxIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "../ModeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logoutApi } from "@/utils/api";

const Navbar = () => {
  const { user } = useSelector((store: RootState) => store.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutApi(dispatch);
    navigate("/auth", {
      replace: true,
    });
  };

  return (
    <div>
      <div className="h-16 w-full shadow-sm hover:shadow-lg transition-shadow duration-200 border-b-2 z-50 md:px-20 px-5 bg-gray-100 dark:bg-gray-900 flex items-center justify-between">
        <Link to={"/"}>
          <div className="h-full w-fit flex items-center gap-3 cursor-pointer font-extrabold md:text-2xl text-sm uppercase text-gray-900 dark:text-gray-100">
            <House size={"30"} />
            <h1>Learn From Hell</h1>
          </div>
        </Link>
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/learning"}>
                  <DropdownMenuItem>Learning</DropdownMenuItem>
                </Link>
                <Link to={"/profile"}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="flex justify-between"
                >
                  Logout
                  <LogOut />
                </DropdownMenuItem>
                {user?.role === "INSTRUCTOR" && (
                  <>
                    <DropdownMenuSeparator />
                    <Button className="w-full">Dashboard</Button>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link to={"/auth"}>
                <Button>Login</Button>
              </Link>
              <Link to={"/auth"}>
                <Button
                  variant={"secondary"}
                  className="hover:bg-gray-300 dark:bg-gray-800 border-gray-300 border-2 dark:border-gray-800"
                >
                  Signup
                </Button>
              </Link>
            </div>
          )}
          <ModeToggle />
        </div>
        <div className="md:hidden flex gap-3">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3 font-extrabold text-2xl uppercase text-gray-900 dark:text-gray-100">
                  <House size={"30"} />
                  <h1>Learn From Hell</h1>
                </SheetTitle>
                <SheetDescription></SheetDescription>
                {user ? (
                  <>
                    <Link to={"/learning"}>
                      <div className="flex gap-2 dark:hover:bg-gray-800 hover:bg-gray-300 py-2 px-3 rounded-md cursor-pointer">
                        <Book />
                        Learning
                      </div>
                    </Link>
                    <Link to={"/profile"}>
                      <div className="flex gap-2 dark:hover:bg-gray-800 hover:bg-gray-300 py-2 px-3 rounded-md cursor-pointer">
                        <PenBoxIcon />
                        Edit Profile
                      </div>
                    </Link>
                    <div
                      onClick={logoutHandler}
                      className="flex gap-2 hover:dark:bg-gray-800 hover:bg-gray-300 py-2 px-3 rounded-md cursor-pointer"
                    >
                      <LogOut />
                      LogOut
                    </div>
                    <Separator />
                    {user?.role === "INSTRUCTOR" && <Button>Dashboard</Button>}
                  </>
                ) : (
                  <>
                  <Link to={"/auth"}>
                    <Button>Login</Button>
                  </Link>
                  <Link to={"/auth"}>
                    <Button variant={"secondary"}>Signup</Button>
                  </Link>
                  </>
                )}
              </SheetHeader>
            </SheetContent>
            <ModeToggle />
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
