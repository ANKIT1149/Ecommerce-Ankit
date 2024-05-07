/* eslint-disable react/prop-types */
// import React from 'react'

import { useContext } from "react";
import ThemeContext from "../Context/ThemeContext";
import { Link } from "react-router-dom";

const ShowProduct = ({ userProduct }) => {
  const { mode } = useContext(ThemeContext);
  return (
    <div>
      {userProduct && (
        <div className="flex flex-col   p-8 w-[100%] h-[100vh] back_image1">
          <h1
            className={`text-center text-4xl font-bold font-serif ${
              mode === "light" ? "text-black" : "text-white"
            }`}
          >
            Your Products
          </h1>
          {userProduct.map((product) => (
            <div
              key={product._id}
              className="p-2 mt-8 border-2 w-[1200px] mx-auto border-amber-400 rounded-lg h-auto flex justify-between items-center gap-8"
            >
              <Link to={`product/${product._id}`}>
                <img
                  src={product.imageUrl[0]}
                  alt=""
                  className="w-[120px] h-[120px] rounded-lg"
                />
              </Link>

              <div>
                <h1 className="text-3xl font-bold font-mono">{product.name}</h1>
              </div>

              <div className="flex gap-16 item-center">
                <button
                  //   onClick={() => handleListingDelete(listing._id)}
                  className="text-white text-xl  uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-product/${product._id}`}>
                  <button className="text-black text-xl font-bold uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowProduct;
