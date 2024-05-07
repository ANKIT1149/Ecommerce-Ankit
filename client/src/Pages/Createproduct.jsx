// import React from 'react'

import { useContext, useState } from "react";
import ThemeContext from "../Context/ThemeContext.js";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../Firebase";
import { data } from "autoprefixer";
import { useSelector } from "react-redux";

const Createproduct = () => {
  const { mode } = useContext(ThemeContext);
  const {Currentuser} = useSelector((state) => state.user)
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [files, setFiles] = useState([]);
  const [filePerc, setFilePerc] = useState(0);
  const [formdata, setFormData] = useState({
    imageUrl: [],
    name: "",
    description: "",
    type: "Summer",
    regularPrice: 50,
    discountPrice: 0,
    address: "",
    size: "MD",
    offer: false,
    contactNumber: 9934438607,
    sellerName: "Aryansh",
  });

  console.log(filePerc);
  console.log(files);
  console.log(formdata);
  const handleSubmitUpload = () => {
    if (files.length > 0) {
      setUploading(true);

      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImg(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formdata,
            imageUrl: formdata.imageUrl.concat(urls),
          });

          setImageUploadError(toast.success("Image uploaded Successfull"));
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError(toast.error("Image Uploaded Failed"));
          setUploading(false);
        });
    } else {
      setImageUploadError(
        toast.error("You can only upload 6 image per listening")
      );
      setUploading(false);
    }
  };

  const storeImg = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
        },

        (error) => {
          reject(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    if (
      e.target.id === "summer" ||
      e.target.id === "winter" ||
      e.target.id === "sports"
    ) {
      setFormData({ ...formdata, type: e.target.id });
    }

    if (e.target.id === "offer") {
      setFormData({ ...formdata, [e.target.id]: e.target.checked });
    }

    if (
      e.target.id === "small" ||
      e.target.id === "medium" ||
      e.target.id === "large" ||
      e.target.id === "extra" ||
      e.target.id === "extra-large"
    ) {
      setFormData({ ...formdata, size: e.target.id });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formdata, [e.target.id]: e.target.value });
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      isLoading(true);
      setError(false);
      const res = await fetch("/api/listening/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...formdata,
          userRef: Currentuser._id,
          officeAddress: formdata.officeAddress,
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        isLoading(false);
        setError(data.message);
        return;
      }
      isLoading(false);
      setFormData(data);
    } catch (error) {
      isLoading(false);
      setError(data.error);
    }
  };
  return (
    <div className="p-4 overfolw-hiiden w-[100%] h-auto">
      <h1
        className={`text-center font-bold text-2xl ${
          mode === "light" ? "text-black" : "text-white"
        }`}
      >
        Create A Product and Start Earning
      </h1>
      <form
        action=""
        onSubmit={handleSubmitForm}
        className="mt-[50px] pl-[30px]"
      >
        <div className="flex items-center gap-28 flex-1">
          <div className="flex flex-col">
            <label
              htmlFor="text"
              className={`p-1 ${
                mode === "light" ? "text-black" : "text-white"
              } font-bold font-serif`}
            >
              Name
            </label>
            <input
              type="text"
              name="text"
              id="name"
              placeholder="Name"
              value={formdata.name}
              onChange={handleChange}
              className="w-[400px] border-2 p-2 border-red-800 rounded-xl mt-2 font-bold font-mono "
            />
          </div>
          {formdata.offer && (
            <div className="flex gap-4 mt-6 items-center">
              <input
                type="number"
                name=""
                id="discountPrice"
                min="10"
                max="10000000"
                value={formdata.discountPrice}
                onChange={handleChange}
                className="w-[100px] h-auto border-2 p-1 rounded-lg border-black"
              />
              <span
                className={`font-bold font-serif ${
                  mode === "light" ? "text-black" : "text-white"
                }`}
              >
                Discount Price
              </span>
              <span>($ / Month )</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-28 flex-1">
          <div className="flex flex-col mt-4">
            <label
              htmlFor="description"
              className={`p-1 ${
                mode === "light" ? "text-black" : "text-white"
              } font-bold font-serif`}
            >
              Description
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              onChange={handleChange}
              value={formdata.description}
              className="w-[400px] border-2 p-2 border-red-800 rounded-xl mt-2 font-bold font-mono "
            />
          </div>
          <div className="flex flex-col gap-4 mt-1">
            <label
              htmlFor="number"
              className={`font-bold font-serif ${
                mode === "light" ? "text-black" : "text-white"
              }`}
            >
              Contact No.
            </label>
            <input
              type="number"
              name="number"
              value={formdata.contactNumber}
              onChange={handleChange}
              id="number"
              className="w-[250px] h-auto border-2 p-2 rounded-lg border-black"
            />
          </div>
        </div>
        <div className="flex items-center gap-28 flex-1">
          <div className="flex flex-col mt-4">
            <label
              htmlFor="address"
              className={`p-1 ${
                mode === "light" ? "text-black" : "text-white"
              } font-bold font-serif`}
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              onChange={handleChange}
              value={formdata.address}
              placeholder="Address"
              className="w-[400px] border-2 p-2 border-red-800 rounded-xl mt-2 font-bold font-mono "
            />
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className={`p-3 border border-gray-300 rounded w-full max-w-md text-xs ${
                  mode === "light" ? "text-black" : "text-white"
                }`}
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                onClick={handleSubmitUpload}
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              >
                {uploading ? "Uploading... " : "Upload"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-4 mt-4">
            <input
              type="checkbox"
              name=""
              id="summer"
              onChange={handleChange}
              checked={formdata.type === "summer"}
            />
            <span
              className={`${mode === "light" ? "text-black" : "text-white"}`}
            >
              Summer
            </span>
          </div>

          <div className="flex gap-4 mt-4">
            <input
              type="checkbox"
              name=""
              id="winter"
              onChange={handleChange}
              checked={formdata.type === "winter"}
            />
            <span
              className={`${mode === "light" ? "text-black" : "text-white"}`}
            >
              Winter Wear
            </span>
          </div>

          <div className="flex gap-4 mt-4">
            <input
              type="checkbox"
              name=""
              id="sports"
              onChange={handleChange}
              checked={formdata.type === "sports"}
            />
            <span
              className={`${mode === "light" ? "text-black" : "text-white"}`}
            >
              Sports Wear
            </span>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <input
            type="checkbox"
            name=""
            id="offer"
            onChange={handleChange}
            checked={formdata.offer}
          />
          <span className={`${mode === "light" ? "text-black" : "text-white"}`}>
            Offer
          </span>
        </div>

        <h1
          className={`mt-4 font-bold ${
            mode === "light" ? "text-black" : "text-white"
          }`}
        >
          Size:
        </h1>
        <div className="flex gap-4">
          <div className="flex gap-4 mt-2">
            <input
              type="checkbox"
              name=""
              id="small"
              onChange={handleChange}
              checked={formdata.size === "small"}
            />
            <span
              className={`font-bold font-serif ${
                mode === "light" ? "text-black" : "text-white"
              }`}
            >
              SM
            </span>
          </div>
          <div className="flex gap-4 mt-2">
            <input
              type="checkbox"
              name=""
              id="medium"
              onChange={handleChange}
              checked={formdata.size === "medium"}
            />
            <span
              className={`font-bold font-serif ${
                mode === "light" ? "text-black" : "text-white"
              }`}
            >
              MD
            </span>
          </div>
          <div className="flex gap-4 mt-2">
            <input
              type="checkbox"
              name=""
              id="large"
              onChange={handleChange}
              checked={formdata.size === "large"}
            />
            <span
              className={`font-bold font-serif ${
                mode === "light" ? "text-black" : "text-white"
              }`}
            >
              LG
            </span>
          </div>
          <div className="flex gap-4 mt-2">
            <input
              type="checkbox"
              name=""
              id="extra"
              onChange={handleChange}
              checked={formdata.size === "extra"}
            />
            <span
              className={`font-bold font-serif ${
                mode === "light" ? "text-black" : "text-white"
              }`}
            >
              XL
            </span>
          </div>
          <div className="flex gap-4 mt-2">
            <input
              type="checkbox"
              name=""
              id="extra-large"
              onChange={handleChange}
              checked={formdata.size === "extra-large"}
            />
            <span
              className={`font-bold font-serif ${
                mode === "light" ? "text-black" : "text-white"
              }`}
            >
              XXL
            </span>
          </div>
        </div>
        <div className="flex items-center gap-28">
          <div className="flex gap-4 mt-8 items-center">
            <input
              type="number"
              name=""
              id="size"
              min="10"
              max="100000000"
              onChange={handleChange}
              value={formdata.regularPrice}
              className="w-[100px] h-auto border-2 border-black p-1 rounded-lg"
            />
            <span
              className={`font-bold font-serif ${
                mode === "light" ? "text-black" : "text-white"
              }`}
            >
              Regular Price
            </span>
            <span>($ / Month )</span>
          </div>

          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 relative bottom-32 left-44 w-[300px]"
          >
            {loading ? "Loading ..." : "Create-Listening"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Createproduct;
