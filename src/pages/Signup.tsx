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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { session, signedUpNewUser } = UserAuth();

  console.log(session);
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    data: FormData
  ) => {
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center p-10 shadow-md rounded-md shadow-gray-600 w-full max-w-sm">
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
        <form
          onSubmit={(e) => onSubmit(e, { email, password, confirmPassword })}
          className="flex flex-col gap-4 text-white w-full"
        >
          <Input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="confirm password"
            type="password"
            minLength={8}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
