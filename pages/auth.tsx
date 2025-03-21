import { useCallback, useState } from "react";
import Input from "../components/input";
import { signIn } from "next-auth/react";
import axios from "axios";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [variant, setVariant] = useState("login");

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,

        callbackUrl: "/profile",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  const toggVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  return (
    <div className="relative h-full   w-full  bg-[url('/image/bacgroundLogin.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full sm:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/image/logo.png" alt="Logo" className="h-14" />
        </nav>
        <div className="flex justify-center sm:h-fit h-full">
          <div className="text-white px-16 bg-black w-full bg-opacity-75 sm:w-[420px] sm:h-full py-16 ">
            <h2 className="text-3xl font-bold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            {variant === "register" && (
              <Input
                label="UserName"
                id="name"
                onChange={(ev: any) => setName(ev.target.value)}
                value={name}
              />
            )}
            <Input
              label="Email"
              id="email"
              type="email"
              onChange={(ev: any) => setEmail(ev.target.value)}
              value={email}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              onChange={(ev: any) => setPassword(ev.target.value)}
              value={password}
            />

            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 w-full mb-5  p-2 rounded-md mt-8 cursor-pointer font-medium"
            >
              {variant === "login" ? " login" : "Sign up"}
            </button>
            <div className="flex flex-row gap-4 justify-center items-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profile" })}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={36} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profile" })}
                className="w-10 h-10  flex items-center justify-center  rounded-full cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub className="relative z-10" size={44} />
              </div>
            </div>

            <p className="text-sm text-gray-400 pt-6">
              First time using Netflix?
              <span
                onClick={toggVariant}
                className="text-white font-bold cursor-pointer "
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
