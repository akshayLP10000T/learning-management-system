import { useEffect } from "react";
import Navbar from "../components/mainLayout/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getUserDataApi } from "@/utils/api";

const MainLayout = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      await getUserDataApi(dispatch);
    };
    getUserData();
  }, [Outlet]);

  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
