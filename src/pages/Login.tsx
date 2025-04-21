
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

function Login() {
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
          <form
            onSubmit={(e) => onSubmit(e , { email, password })}
            className="flex flex-col gap-4 text-white w-full"
          >
            <Input
                      placeholder="username"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                      placeholder="password"
                      type="password"
                      minLength={8}
                      onChange={(e) => setPassword(e.target.value)}
                    />
            <Button type="submit">
              Login
            </Button>
          </form>
      </div>
    </div>
  );
}

export default Login;