// import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Product from "./Pages/Product";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Themeprovider from "./Context/Themeprovider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useSelector } from "react-redux";
import Profile from "./Pages/Profile";
import Createproduct from "./Pages/Createproduct";
import { useState } from "react";
import ShowProduct from "./components/ShowProduct";
const App = () => {
  const { Currentuser } = useSelector((state) => state.user);
  const [userProduct, setProductUser] = useState([]);
  const [loading, isLoding] = useState(false);
  const [producterror, setProducterrror] = useState(false);
  const showProduct = async () => {
    try {
      isLoding(true);
      setProducterrror(false);
      const res = await fetch(`/api/user/products/${Currentuser._id}`);
      const data = await res.json();
      if (data.success === false) {
        isLoding(false);
        setProducterrror(true);
        toast.error("Showing Product Failed");
        console.log(data.message);
        return;
      }
      setProducterrror(false);
      isLoding(false);
      setProductUser(data);
      toast.success("Showing Product Success");
      console.log(setProductUser);
    } catch (error) {
      isLoding(false);
      setProducterrror(true);
      toast.error("Showing Product Failed");
      console.log(error);
    }
  };

  return (
    <Themeprovider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <div>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/product" element={<Product />} />
                  {Currentuser && (
                    <Route path="/create-product" element={<Createproduct />} />
                  )}
                  {Currentuser && (
                    <Route
                      path="/show-product"
                      element={
                        <ShowProduct
                          userProduct={userProduct}
                          producterror={producterror}
                          loading={loading}
                        />
                      }
                    />
                  )}
                </Routes>
              </div>
            }
          />
          <Route
            path={Currentuser ? "/profile" : "/sign-in"}
            element={
              Currentuser ? (
                <div>
                  <Navbar />
                  <Profile showProduct={showProduct} />
                </div>
              ) : (
                <Signin />
              )
            }
          />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Themeprovider>
  );
};

export default App;
