import { useEffect } from "react";
import Navbar from "../components/mainLayout/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUserDataApi } from "@/utils/api";

const MainLayout = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    const getUserData = async () => {
      if (user) await getUserDataApi(dispatch);
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
