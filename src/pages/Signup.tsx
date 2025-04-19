import { useForm, FormProvider } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

function Signup() {
  const formMethods = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { session , signedUpNewUser } = UserAuth();

  console.log(session);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement> , data: FormData) => {
    e.preventDefault();
    try{
      if (data.password !== data.confirmPassword) {
        console.log("Passwords do not match");
      }
      else{
        const result = await signedUpNewUser(email, password);
        if(!result.success){
          console.log(result.error.message);
          alert(result.error.message);
        }
        else{
          console.log(result);
          alert("Signup successful");
        }
      }
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center p-10 shadow-md rounded-md shadow-gray-600">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4 text-white">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
        <FormProvider {...formMethods}>
          <form
            onSubmit={(e) => onSubmit(e, { email, password, confirmPassword })}
            className="flex flex-col gap-4 text-white w-full"
          >
            <FormField
              control={formMethods.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      type="email"
                      {...field}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      minLength={8}
                      {...field}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="confirm password"
                      type="password"
                      minLength={8}
                      {...field}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              Submit
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default Signup;
