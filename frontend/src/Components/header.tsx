import { Link } from "react-router-dom";
import { clearAccessToken, getAccessToken } from "../Auth/Tokens";
import { clearRole } from "../Auth/role";

export function NavBar() {
  return (
    <header className="h-14 w-min flex justify-between items-center fixed border-black mx-25 my-5 rounded-3xl backdrop-blur-xs inset-0 bg-gradient-to-tl from-[#7df9fb] to-[#d8ffcd] opacity-90 z-50">
      <Link to="/">
        <div className="ml-40 h-16 w-70 font-semibold flex justify-center items-center text-3xl subpixel-antialiased tracking-tighter gap-2 hover:cursor-pointer text-black">
          CodeRift
          <span className="mt-1 h-4 w-4 bg-black animate-spin"></span>
        </div>
      </Link>
      <div className="mr-20 h-14 w-180 flex justify-center items-center gap-5 mt-1 text-black">
        <div className="text-l font-medium hover:cursor-pointer h-8 w-22 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
          Premium
        </div>
        <div className="text-l font-medium hover:cursor-pointer h-8 w-20 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
          Explore
        </div>
        <Link to="/problems">
          <div className="text-l font-medium hover:cursor-pointer h-8 w-22 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
            Problem
          </div>
        </Link>
        <Link to="/contest">
          <div className="text-l font-medium hover:cursor-pointer h-8 w-22 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
            Contests
          </div>
        </Link>
        {!getAccessToken() ? (
          <Link to="/login">
            <div className="text-l font-medium hover:cursor-pointer h-8 w-20 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
              SignIn
            </div>
          </Link>
        ) : (
          <Link to="/">
            <div
              onClick={() => {
                clearAccessToken();
                clearRole();
                window.location.reload();
              }}
              className="text-l font-medium hover:cursor-pointer h-8 w-20 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in"
            >
              Logout
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
