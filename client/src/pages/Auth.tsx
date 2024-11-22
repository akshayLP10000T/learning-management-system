import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpLayout from "@/components/auth/SignUp";
import LoginLayout from "@/components/auth/Login";

const Auth = () => {
  return (
    <div className="w-full min-h-screen items-center justify-center flex">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">SignUp</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <SignUpLayout />
        </TabsContent>
        <TabsContent value="login">
          <LoginLayout />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
