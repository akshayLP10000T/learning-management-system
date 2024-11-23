import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroSection from "./components/mainLayout/HeroSection";
import { ThemeProvider } from "./components/ThemeProvider";
import MainLayout from "./pages/MainLayout";
import Auth from "./pages/Auth";
import Learning from "./components/mainLayout/Learning";
import Profile from "./components/mainLayout/Profile";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/dashboard/Sidebar";
import Courses from "./components/dashboard/course/Courses";
import AddCourse from "./components/dashboard/course/AddCourse";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/learning",
        element: <Learning />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "courses",
            element: <Courses />
          },
          {
            path: "add-course",
            element: <AddCourse />
          },
        ]
      }
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  );
};

export default App;
