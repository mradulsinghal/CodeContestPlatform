import { useRef, useState } from "react";
import { Close } from "../lib/close";
import { Eye } from "../lib/eye";
import { Google } from "../lib/google";
import { EyeClosed } from "../lib/eyeClosed";
import { Link, useNavigate } from "react-router-dom";
import { setAccessToken } from "../Auth/Tokens";
import { BACKEND_URL, setRole } from "../Auth/role";
import axios from "axios";

export function Login() {
  const navigate = useNavigate();
  const [ShowPass, setShowPass] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  function ShowPassword() {
    setShowPass((s) => !s);
  }

  function userLogin() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    async function update() {
      try {
        const res = await axios.post(`${BACKEND_URL}/auth/login`, {
          email: email,
          password: password,
        });
        if (res.data.accessToken) {
          setAccessToken(res.data.accessToken);
          setRole(res.data.role);
          navigate("/problems");
          window.location.reload();
        } else {
          alert("Invalid credentials");
        }
      } catch (e) {
        alert("Invalid credentials / Server error");
      }
    }
    update();
  }

  return (
    <>
      <div className="flex z-10 absolute items-center justify-center w-full h-full text-black">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border-solid border-black/60 border w-[450px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">My Account</h2>
            <Link to="/" className="cursor-pointer hover:text-black/50">
              <Close />
            </Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <button className="h-12 w-full flex justify-center items-center border border-gray-600 rounded-lg gap-2 hover:bg-gray-100 transition">
              <Google />
              Sign in to Google
            </button>
            <div className="text-center text-sm font-medium text-gray-500">Or</div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-thin pl-1">Email*</label>
              <input
                ref={emailRef}
                className="h-12 w-full border border-black/50 rounded-lg px-3 hover:border-black focus:outline-black"
                placeholder="Email"
                type="text"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-thin pl-1">Password*</label>
              <div className="relative flex items-center">
                <input
                  ref={passwordRef}
                  className="h-12 w-full border border-black/50 rounded-lg px-3 pr-10 hover:border-black focus:outline-black"
                  placeholder="Password"
                  type={ShowPass ? "text" : "password"}
                />
                <button
                  onClick={ShowPassword}
                  className="absolute right-3 focus:outline-none"
                >
                  {ShowPass ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>

            <button
              onClick={userLogin}
              className="mt-4 h-12 w-full bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Sign In
            </button>

            <div className="mt-6 flex flex-col items-center border-t pt-4 text-sm text-gray-600 gap-3">
              I don't have an account
              <Link to="/signup" className="w-full">
                <button className="h-12 w-full border border-black text-black rounded-lg font-medium hover:bg-gray-100 transition">
                  Create Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
