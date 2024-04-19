// import React from 'react'
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import { signInFail, signInStart, signInSuccess } from "../Redux/User/Userslice";
import OAuth from "../components/OAuth";
const Signin = () => {
  const [formdata, setFormData] = useState({});
  const {error, loading} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
       dispatch(signInStart)
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false){
       dispatch(signInFail(data.message));
       return
      }
      toast.success("Login in Account successfully");
      dispatch(signInSuccess(data))
      navigate("/");
    } catch (error) {
      dispatch(signInFail(error.message));
      toast.error(" Login in Account failed", (error))
      console.log(error);
    
    }
  };

  return (
    <div className="w-[100%] h-screen overflow-hidden back_image">
      <div className="flex justify-center items-center flex-wrap w-[100%] h-screen gap-[300px]">
        <div className="flex justify-center items-center  flex-col">
          <h1 className="text-[50px] font-bold  font-serif capitalize leading-relaxed text-center">
            <span className="text-white text-center">Welcome Back !</span> <br />{" "}
            <span className="text-amber-500">LogiKit -</span> <br />{" "}
            <span className=" text-amber-400">A Shopping Site.</span>
          </h1>
          <p className="mt-4 max-w-md text-center font-light font-sans text-xl leading-relaxed text-gray-500">
            Offers, Affordable Price, Best Product, Earn Money.All things in
            your hand. Grab it now.{" "}
          </p>
          <div className="flex gap-2 mt-3 mr-8">
            <h1 className="font-bold font-sans text-black text-2xl">
              Do not Have an Account ?
            </h1>
            <Link to={"/sign-up"}>
              <h1 className="font-bold font-serif text-white text-2xl">
                Sign Up
              </h1>
            </Link>
          </div>
        </div>
        <div className="flex  items-center flex-col w-[500px] h-[450px] border-2 border-cyan-800 background shadow-md shadow-black rounded-tl-[2%] rounded-bl-xl rounded-tr-xl rounded-br-[4%]">
          <h1 className="font-bold font-serif text-2xl mt-2">
            Login Into Your Account
          </h1>
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col mt-6 gap-4"
          >
           
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
            <button
              type="submit"
              disabled = {loading}
              className="w-[300px] mx-auto h-auto border-2 border-red-600 p-3 bg-red-600 rounded-2xl text-white font-bold font-serif cursor-pointer"
            >
             {loading ? 'Loading ...' : 'Sign In'}
            </button>
          </form>
          <span className="mt-1">Or</span>
          <div className="flex items-center justify-center mt-[10px]">
            <div className="w-[40px] h-[40px] border-2 border-green-600 bg-green-700 flex justify-center items-center">
              <FcGoogle size={30} />
            </div>
            <OAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
