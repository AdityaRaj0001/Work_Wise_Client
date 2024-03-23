import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const Navigate = useNavigate();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const [password, setpassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://work-wise.onrender.com/api/auth/signup", {
        username: username,
        email: email,
        password: password,
        isAdmin:isAdmin
      });

      const data = response.data;
      setusername("");
      setemail("");
      setisAdmin(false)
      setpassword("");
      Navigate("/signin");
    } catch (error) {
      toast(error.response.data.message);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center flex flex-col gap-8 items-center justify-center">
      <h1 className="w-full tracking-widest font-medium text-2xl text-black text-center ">Welcome to WorkWise</h1>
      <ToastContainer />
      <Card className="w-[350px] opacity-90">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>let's get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  placeholder="your username"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  placeholder="your email"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  placeholder="your password"
                />
              </div>
              <div className="flex  space-x-1.5">
                <Checkbox id="terms"  defaultChecked={isAdmin} onClick={()=>{setisAdmin(!isAdmin)}} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  SignUp as Admin
                </label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to={"/signin"}>
            <Button variant="outline" className="text-[12px]">Already have an account? SignIn</Button>
          </Link>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
