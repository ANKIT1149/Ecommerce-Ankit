/* eslint-disable no-constant-condition */
// import React from 'react'

import { useContext, useState } from "react";
import ThemeContext from "../Context/ThemeContext";
import { data } from "./Data";
import { Link, NavLink } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import { BsCart, BsFillCloudSunFill } from "react-icons/bs";
// import { Link, NavLink } from "react-router-dom";
// import { data } from "autoprefixer";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { Currentuser } = useSelector((state) => state.user);
  const { mode, ChangeMode } = useContext(ThemeContext);
  const [menuOpne, menuClose] = useState(false);
  const mobile = window.innerWidth <= 768 ? true : false;

  // funcation of mobile navabr

  let ChangeMenu = document.getElementById("Change-Menu");

  const OpenNavbar = () => {
    if (ChangeMenu.style.right === "3000px") {
      ChangeMenu.style.right = "0px";
    } else {
      ChangeMenu.style.right === "3000px";
    }
  };
  return (
    <header
      className={`w-full h-auto ${
        window.location.href === "/sign-up" ? "hidden" : ""
      }`}
    >
      <div
        className={`flex justify-between items-center flex-wrap gap-0  p-5 shadow-md  ${
          mode === "dark" ? "bg-black" : "light" ? "bg-amber-400" : ""
        } ${mode === "light" ? "shadow-black" : "shadow-white"}`}
      >
        <div className="flex">
          <h1 className="font-bold text-3xl font-serif text-white">Logi</h1>
          <span className="font-bold text-3xl font-serif text-red-700">
            Kit
          </span>
        </div>
        {menuOpne === false && mobile === true ? (
          <div
            onClick={OpenNavbar}
            className="absolute right-8 border-2 border-blue-700 hover:bg-transparent cursor-pointer hover:text-black transition-all rounded-full w-[40px] h-[40px] flex justify-center items-center bg-blue-700"
          >
            <FiMenu className="text-white text-2xl font-bold hover:text-black transition-all" />
          </div>
        ) : (
          <nav
            className={`flex gap-16 justify-center items-center   max-sm:top-10 max-sm:transition-all max-sm:w-[50vw] max-sm:h-[80vh] ${
              mode === "light" ? "max-sm:bg-indigo-300" : "bg-black"
            }`}
            id="ChangeMenu"
          >
            <ul className="flex justify-center items-center gap-8">
              {data.map((url) => (
                <li key={url.to}>
                  <NavLink
                    to={url.to}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-white hover:text-white"
                          : "text-rose-700"
                      } ${
                        mode === "light"
                          ? "hover:text-black transition-all"
                          : "text-white transition-all"
                      } font-bold font-serif text-xl`
                    }
                  >
                    {url.element}
                  </NavLink>
                </li>
              ))}

              <NavLink
                to={Currentuser ? "/profile" : "/sign-in"}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white hover:text-white" : "text-rose-700"
                  } ${
                    mode === "light"
                      ? "hover:text-black transition-all"
                      : "text-white transition-all"
                  } font-bold font-serif text-xl`
                }
              >{Currentuser ? (<img src={Currentuser.avatar} alt="profile" className="w-[50px] h-[50px] rounded-full"/>) : 'Signin'}</NavLink>
            </ul>

            <form>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search ..."
                className="border-2 border-gray-200 font-semibold font-mono focus:shadow-none shadow-inner transition-all shadow-black focus:border-red-900 p-2 rounded-xl outline-none "
              />
            </form>
          </nav>
        )}

        <div className="max-sm:mr-16 flex justify-center items-center gap-10">
          <Link to="/cart" title="Cart Section">
            <BsCart
              size={30}
              className={`text-justify ${
                mode === "light" ? "text-rose-700" : "text-white"
              } font-bold `}
            />
          </Link>
          <button
            onClick={ChangeMode}
            className=" max-sm:mt-2"
            title={mode === "light" ? "Dark mode" : "Light Mode"}
          >
            {mode === "light" ? (
              <FiSun className="" size={30} />
            ) : (
              <BsFillCloudSunFill size={30} className="text-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
