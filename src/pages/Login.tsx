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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>, data: FormData) => {
    e.preventDefault();
    try {
      const result = await signInUser(data.email, data.password);
      if (!result.success) {
        console.log(result.error.message);
        alert(result.error.message);
      } else {
        console.log(result);
        alert("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center p-10 shadow-lg rounded-lg bg-white max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Login</h1>
        <p className="text-sm text-gray-600 mb-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
        <form
          onSubmit={(e) => onSubmit(e, { email, password })}
          className="flex flex-col gap-4 w-full"
        >
          <Input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <Input
            placeholder="Password"
            type="password"
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;