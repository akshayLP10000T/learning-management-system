import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroSection from "./components/mainLayout/HeroSection";
import { ThemeProvider } from "./components/ThemeProvider";
import MainLayout from "./pages/MainLayout";
import Auth from "./pages/Auth";
import Learning from "./components/mainLayout/Learning";
import Profile from "./components/mainLayout/Profile";

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
