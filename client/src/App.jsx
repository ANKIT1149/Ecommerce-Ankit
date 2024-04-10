// import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Product from "./Pages/Product";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Themeprovider from "./Context/Themeprovider";
import "./App.css"
const App = () => {
  return (
    <Themeprovider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Themeprovider>
  );
};

export default App;
