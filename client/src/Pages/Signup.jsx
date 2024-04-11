// import React from 'react'
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
const Signup = () => {
  const [formdata, setFormData] = useState({});
  const [loading, SetLoading] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const Handlechanges = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
    //  console.log(formdata)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       SetLoading(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false){
         SetLoading(false);
         setError(data.message)
      }
      toast.success("Account Registered successfully");
      SetLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (Error) {
      toast.error("Account registration failed", error)
      console.log(Error);
      SetLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="w-[100%] h-screen overflow-hidden back_image">
      <div className="flex justify-center items-center flex-wrap w-[100%] h-screen gap-[300px]">
        <div className="flex justify-center items-center  flex-col">
          <h1 className="text-[50px] font-bold  font-serif capitalize leading-relaxed text-center">
            <span className="text-white text-center">Welcome To</span> <br />{" "}
            <span className="text-amber-500">LogiKit -</span> <br />{" "}
            <span className=" text-amber-400">A Shopping Site.</span>
          </h1>
          <p className="mt-4 max-w-md text-center font-light font-sans text-xl leading-relaxed text-gray-500">
            Offers, Affordable Price, Best Product, Earn Money.All things in
            your hand. Grab it now.{" "}
          </p>
          <div className="flex gap-2 mt-3 mr-8">
            <h1 className="font-bold font-sans text-black text-2xl">
              Have an Account ?
            </h1>
            <Link to={"/sign-in"}>
              <h1 className="font-bold font-serif text-white text-2xl">
                Sign In
              </h1>
            </Link>
          </div>
        </div>
        <div className="flex  items-center flex-col w-[500px] h-[700px] border-2 border-cyan-800 background shadow-md shadow-black rounded-tl-[2%] rounded-bl-xl rounded-tr-xl rounded-br-[4%]">
          <h1 className="font-bold font-serif text-2xl mt-2">
            Register Your Account
          </h1>
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col mt-6 gap-4"
          >
            <label
              htmlFor="username"
              className="text-xl font-semibold text-black font-serif"
            >
              Your Name
            </label>
            <input
              onChange={Handlechanges}
              type="text"
              name="username"
              id="username"
              className="w-[300px] p-2 outline-none  rounded-l-2xl rounded-tr-3xl focus:border-green-700 focus:border-2 shadow-inner shadow-gray-800 font-semibold font-serif capitalize"
            />
            <label
              htmlFor="email"
              className="text-xl font-semibold text-black font-serif"
            >
              Your Email
            </label>
            <input
              onChange={Handlechanges}
              type="email"
              name="email"
              id="email"
              className="w-[300px] p-2 outline-none rounded-l-2xl rounded-tr-3xl focus:border-green-700 focus:border-2 shadow-inner shadow-gray-800 font-semibold font-serif capitalize"
            />
            <label
              htmlFor="password"
              className="text-xl font-semibold text-black font-serif"
            >
              Your Password
            </label>
            <input
              onChange={Handlechanges}
              type="password"
              name="password"
              id="password"
              className="w-[300px] p-2 outline-none rounded-l-2xl rounded-tr-3xl focus:border-green-700 focus:border-2 shadow-inner shadow-gray-800 font-semibold font-serif capitalize"
            />
            <label
              htmlFor="phone"
              className="text-xl font-semibold text-black font-serif"
            >
              Your Mobile No.
            </label>
            <input
              onChange={Handlechanges}
              type="number"
              name="phone"
              id="phone"
              className="w-[300px] p-2 outline-none rounded-l-2xl rounded-tr-3xl focus:border-green-700 focus:border-2 shadow-inner shadow-gray-800 font-semibold font-serif capitalize"
            />
            <label
              htmlFor="age"
              className="text-xl font-semibold text-black font-serif"
            >
              Your Age
            </label>
             <input onChange={Handlechanges} type="number" name="age" id="age"  className="w-[300px] p-2 outline-none rounded-l-2xl rounded-tr-3xl focus:border-green-700 focus:border-2 shadow-inner shadow-gray-800 font-semibold font-serif capitalize" />
            <button
              type="submit"
              disabled = {loading}
              className="w-[300px] mx-auto h-auto border-2 border-red-600 p-3 bg-red-600 rounded-2xl text-white font-bold font-serif cursor-pointer"
            >
             {loading ? 'Loading ... ': 'Sign Up'}
            </button>
          </form>
          <span className="mt-1">Or</span>
          <div className="flex items-center justify-center mt-[10px]">
            <div className="w-[40px] h-[40px] border-2 border-green-600 bg-green-700 flex justify-center items-center">
              <FcGoogle size={30} />
            </div>
            <button
              type="button"
              className="w-[300px] h-[40px] border-2 bg-slate-200 hover:bg-transparent cursor-pointer transition-all text-black font-semibold font-serif"
            >
              Sign Up With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
