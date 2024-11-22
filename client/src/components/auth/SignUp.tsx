import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SignUp } from "@/types/Form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { SignUpApi } from "@/utils/api";

const SignUpLayout = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await SignUpApi(signUpData, setLoading);
    setSignUpData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const signUpDataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const [signUpData, setSignUpData] = useState<SignUp>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Make you account and start learning with us. Fill the following
          details to contiue...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-2" onSubmit={(e) => handleSignUp(e)}>
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              type="name"
              placeholder="Enter your name"
              value={signUpData.name}
              onChange={(e) => signUpDataChangeHandler(e)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={signUpData.email}
              onChange={(e) => signUpDataChangeHandler(e)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={signUpData.password}
              onChange={(e) => signUpDataChangeHandler(e)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={signUpData.confirmPassword}
              onChange={(e) => signUpDataChangeHandler(e)}
            />
          </div>
          <CardFooter className="pl-0">
            {loading ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button type="submit">Register</Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpLayout;
