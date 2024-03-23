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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/user.slice";

export default function Signin() {
  const Navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(signInStart());

    try {
      const response = await axios.post("https://work-wise.onrender.com/api/auth/signin", {
        email: email,
        password: password,
      });

      const data = response.data;
      dispatch(signInSuccess(data));

      Navigate("/");
    } catch (error) {
      toast(error.response.data.message);
      dispatch(signInFailure(error.response.data.message));
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-[100vh]  flex flex-col gap-8 items-center justify-center">
      <h1 className="w-full text-2xl text-white tracking-wider text-center font-medium">Welcome to WorkWise</h1>
      <ToastContainer />
      <Card className="w-[350px] opacity-80">
        <CardHeader>
          <CardTitle>Fill in the details</CardTitle>
          <CardDescription>let's get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  type="email"
                  placeholder="your email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  placeholder="your password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to={"/signup"} onClick={() => dispatch(signInFailure(null))}>
            <Button className="text-[12px]" variant="outline">Don't Have an account? Register</Button>
          </Link>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
