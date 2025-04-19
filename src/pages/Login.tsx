import { useForm, FormProvider } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

function Login() {
  const formMethods = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  interface FormData {
    email: string;
    password: string;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement> , data: FormData) => {
    e.preventDefault();
    try {
        const result = await signInUser(data.email, data.password);
        if(!result.success){
            console.log(result.error.message);
            alert(result.error.message);
        }
        else{
            console.log(result);
            alert("Login successful");
            navigate("/dashboard");
        }
    } catch (error) {
      console.log(error);
    }

    // Add your form submission logic here
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center p-10 shadow-md rounded-md shadow-gray-600">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4 text-white">
            Login into your account
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Already have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
        <FormProvider {...formMethods}>
          <form
            onSubmit={(e) => onSubmit(e , { email, password })}
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
            <Button type="submit">
              Submit
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default Login;
