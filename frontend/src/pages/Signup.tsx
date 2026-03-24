import { useRef, useState } from "react";
import { Close } from "../lib/close";
import { Eye } from "../lib/eye";
import { EyeClosed } from "../lib/eyeClosed";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../Auth/role";

export function Signup() {
  const navigate = useNavigate();
  const [ShowPass, setShowPass] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);

  function ShowPassword() {
    setShowPass((s) => !s);
  }

  function handleSignup() {
    const email = emailRef.current?.value;
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;
    const role = roleRef.current?.value;

    async function update() {
      try {
        const res = await axios.post(`${BACKEND_URL}/auth/signup`, {
          name: name,
          email: email,
          password: password,
          role: role?.toUpperCase() || "USER",
        });
        if (res) {
          alert("Signed up successfully!");
          navigate("/login", { replace: true });
        }
      } catch (e: any) {
        alert(e.response?.data?.error || "Signup failed");
      }
    }
    update();
  }

  return (
    <>
      <div className="flex z-10 absolute items-center justify-center w-full h-full text-black">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border-solid border-black/60 border w-[450px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Create Account</h2>
            <Link to="/" className="cursor-pointer hover:text-black/50">
              <Close />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-thin pl-1">Name*</label>
              <input
                ref={nameRef}
                className="h-12 w-full border border-black/50 rounded-lg px-3 hover:border-black focus:outline-black"
                placeholder="Name"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-thin pl-1">Email*</label>
              <input
                ref={emailRef}
                className="h-12 w-full border border-black/50 rounded-lg px-3 hover:border-black focus:outline-black"
                placeholder="Email"
                type="email"
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

            <div className="flex flex-col gap-1">
              <label className="text-sm font-thin pl-1">Role*</label>
              <input
                ref={roleRef}
                className="h-12 w-full border border-black/50 rounded-lg px-3 hover:border-black focus:outline-black"
                placeholder="USER or ADMIN"
                type="text"
                defaultValue="USER"
              />
            </div>

            <button
              onClick={handleSignup}
              className="mt-6 h-12 w-full bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Sign Up
            </button>
            <div className="text-center text-sm font-medium mt-2">
              <Link to="/login" className="hover:underline">Already have an account? Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
