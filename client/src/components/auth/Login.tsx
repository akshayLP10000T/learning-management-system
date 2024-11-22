import { Login } from "@/types/Form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { LoginApi } from "@/utils/api";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const LoginLayout = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<Login>({
    email: "",
    password: "",
  });
  const loginDataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const dispatch: AppDispatch = useDispatch();

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await LoginApi(loginData, dispatch, setLoading);
    setLoginData({
      email: "",
      password: "",
    });
    navigate("/", {
      replace: true,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login again. And start learning again...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-2" onSubmit={(e) => handleLogin(e)}>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={(e) => loginDataChangeHandler(e)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) => loginDataChangeHandler(e)}
            />
          </div>
          <CardFooter className="pl-0">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button type="submit">Login</Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginLayout;
