"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Toast from "@/components/toast";
import HomeButton from "@/components/button";
import HomeInput from "@/components/input";

const Login = () => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "info"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //  if (response?.status === false) {
    //     setToastMessage(response.status || "You cannot deactivate your own account.");
    //     setToastType("error");
    //     setShowToast(true);
    //     return;
    //   }

    if (email === "olayinkamferanmi@gmail.com" && password === "admin") {
      setToastMessage("Login successful...");
      setToastType("success");
      setShowToast(true);
      // ✅ Set a cookie (you can also set expiry, secure, etc.)
      Cookies.set("token", "your-static-token-or-generated-value", {
        expires: 1, // 1 day
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      router.push("/dashboard");
    } else {
      // alert("");
      setToastMessage("Email or Password not correct");
      setToastType("error");
      setShowToast(true);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Admin Portal
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <HomeInput
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter email"
            label="Enter Email"
            height="45px"
          />

          <HomeInput
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            label="Enter Password"
            height="45px"
          />

          <HomeButton
            title="Login"
            type="submit"
            bg="#193A8E"
            width="100%"
            height="45px"
          />
        </form>
      </div>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Login;
