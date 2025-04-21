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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { signedUpNewUser } = UserAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>, data: FormData) => {
    e.preventDefault();
    try {
      if (data.password !== data.confirmPassword) {
        console.log("Passwords do not match");
      } else {
        const result = await signedUpNewUser(email, password);
        if (!result.success) {
          console.log(result.error.message);
          alert(result.error.message);
        } else {
          console.log(result);
          alert("Signup successful");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center p-10 shadow-lg rounded-lg bg-white max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Create an account</h1>
        <p className="text-sm text-gray-600 mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
        <form
          onSubmit={(e) => onSubmit(e, { email, password, confirmPassword })}
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
          <Input
            placeholder="Confirm Password"
            type="password"
            minLength={8}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
