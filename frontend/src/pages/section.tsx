import { Footer } from "../Components/Footer";
import { Login } from "./Login";
import { Signup } from "./Signup";

export function Section() {
  return (
    <>
      <section className="bg-gradient-to-r from-teal-900 to-indigo-900 h-screen bg-no-repeat bg-cover bg-center py-20 flex justify-center items-center flex-col gap-6">
        <h1 className="text-6xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">Welcome to CodeRift</h1>
        <p className="text-xl text-teal-100 max-w-2xl text-center leading-relaxed">
          The ultimate platform to level up your coding skills, practice competitive programming, and conquer algorithmic challenges. Let's write some code today.
        </p>
      </section>
      <Footer />
    </>
  );
}

export function SignupPage() {
  return (
    <>
      <section className="h-screen py-20 flex justify-center items-center bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900 to-emerald-900 opacity-60"></div>
        <Signup />
      </section>
    </>
  );
}

export function LoginPage() {
  return (
    <>
      <section className="h-screen py-20 flex justify-center items-center bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900 to-emerald-900 opacity-60"></div>
        <Login />
      </section>
    </>
  );
}
