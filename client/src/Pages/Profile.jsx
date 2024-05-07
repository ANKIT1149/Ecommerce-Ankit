/* eslint-disable react/prop-types */
// import React from 'react'

import { useContext, useEffect, useRef, useState } from "react";
import ThemeContext from "../Context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { MdOutlineMailLock } from "react-icons/md";
import { GrSecure } from "react-icons/gr";
import { FcPhone } from "react-icons/fc";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../Firebase";
import { toast } from "react-toastify";
import {
  deleteUsersuccess,
  deleteuserFailure,
  deleteuserStart,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../Redux/User/Userslice";

const Profile = ({ showProduct }) => {
  const fileRef = useRef(null);
  const { Currentuser } = useSelector((state) => state.user);
  const { mode } = useContext(ThemeContext);
  const [file, setFile] = useState(undefined);
  const [formdata, setFormData] = useState({});
  const [filePerc, setfilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleuploadfile();
    }
  }, [file]);

  const handleuploadfile = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const fileRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilePerc(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((getDownloadUrl) => {
          setFormData({ ...formdata, avatar: getDownloadUrl });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };

  const updateForm = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${Currentuser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error("Updating Profile Failed");
        return;
      }

      dispatch(updateUserSuccess(data));
      toast.success("Profile page updated Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error.message));
      toast.error("Profile page updation failed");
    }
  };

  const handleDeleteuser = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteuserStart());

      const res = await fetch(`api/user/delete/${Currentuser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteuserFailure(data.message));
        return;
      }

      dispatch(deleteUsersuccess(data));
      toast.success("User Deleted Successfully");
      navigate("/sign-up");
    } catch (error) {
      console.log(error);
      dispatch(deleteuserFailure(error.message));
      toast.error("User not deleted successfully");
    }
  };

  const handleSignoutuser = async (e) => {
    e.preventDefault();

    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");

      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data));
      toast.success("Logout Successfully");
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed");
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="w-[100%] h-screen  back_image_profile">
      <div className="w-auto h-auto p-5 mt-8">
        <h1
          className={`text-center font-bold text-3xl font-serif capitalize border-b-2 border-red-600 max-w-md mx-auto ${
            mode === "light" ? "text-black" : "text-white"
          }`}
        >
          Profile
        </h1>
        <div className="flex justify-center items-center">
          <div className="w-[30%] h-[135vh] border-4 border-blue-800 shadow-md shadow-amber-400 bg-gray-200 relative">
            <div className="w-[100%] h-[40vh] border-2  rounded-b-full border-blue-900 bg-blue-700 flex justify-center items-center flex-col">
              <h1 className="mb-3 font-bold text-xl font-serif text-white text-center relative bottom-6">
                {Currentuser.username}
              </h1>
              <form onSubmit={updateForm} action="">
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  name=""
                  id=""
                  className="hidden"
                  ref={fileRef}
                />
                <img
                  onClick={() => fileRef.current.click()}
                  src={formdata.avatar || Currentuser.avatar}
                  alt=""
                  className="rounded-full w-[120px] h-[120px] cursor-pointer relative bottom-4"
                />
                <p className="text-sm text-center">
                  {fileUploadError ? (
                    <span className="text-red-800">
                      Error Image Upload(Image less than 2kb)
                    </span>
                  ) : filePerc > 0 && filePerc < 100 ? (
                    <span className="text-orange-700">{`Uploading ${filePerc} %`}</span>
                  ) : filePerc === 100 ? (
                    <span className="text-white">Upload Successfull</span>
                  ) : (
                    ""
                  )}
                </p>
                <div className="absolute top-[42%] left-[4%] flex justify-center items-center gap-8 flex-col">
                  <div className="flex justify-center items-center gap-6 border-b-2 border-b-slate-400">
                    <FiUser color="green" size={30} />
                    <input
                      onChange={handleChange}
                      type="text"
                      name=""
                      id="username"
                      defaultValue={Currentuser.username}
                      placeholder="Username"
                      className="w-[300px] p-2 font-bold font-serif text-black border-transparent focus:outline-none bg-transparent outline-none border-none shadow-none"
                    />
                  </div>

                  <div className="flex justify-center items-center gap-6 border-b-2 border-b-slate-400">
                    <MdOutlineMailLock color="green" size={30} />
                    <input
                      onChange={handleChange}
                      defaultValue={Currentuser.email}
                      type="email"
                      name=""
                      id="email"
                      placeholder="Email"
                      className="w-[300px] p-2 font-bold font-serif text-black border-transparent focus:outline-none bg-transparent outline-none border-none shadow-none"
                    />
                  </div>

                  <div className="flex justify-center items-center gap-6 border-b-2 border-b-slate-400">
                    <GrSecure color="green" size={30} />
                    <input
                      onChange={handleChange}
                      defaultValue={Currentuser.pass}
                      type="password"
                      name=""
                      id="password"
                      placeholder="Password"
                      className="w-[300px] p-2 font-bold font-serif text-black border-transparent focus:outline-none bg-transparent outline-none border-none shadow-none"
                    />
                  </div>

                  <div className="flex justify-center items-center gap-6 border-b-2 border-b-slate-400">
                    <FcPhone color="green" size={30} />
                    <input
                      onChange={handleChange}
                      defaultValue={Currentuser.phone}
                      type="phone"
                      name=""
                      id="phone"
                      placeholder="Phone"
                      className="w-[300px] p-2 font-bold font-serif text-black border-transparent focus:outline-none bg-transparent outline-none border-none shadow-none"
                    />
                  </div>

                  <div className="flex justify-center items-center gap-6 border-b-2 border-b-slate-400">
                    <FaPersonWalkingLuggage color="green" size={30} />
                    <input
                      onChange={handleChange}
                      defaultValue={Currentuser.age}
                      type="text"
                      name=""
                      id="age"
                      placeholder="Age"
                      className="w-[300px] p-2 font-bold font-serif text-black border-transparent focus:outline-none bg-transparent outline-none border-none shadow-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-[300px] p-2 h-auto font-bold font-serif  border-blue-700 border-2 bg-blue-800 text-white rounded-lg hover:bg-transparent hover:border-green-600 hover:text-black transition-all"
                  >
                    Update
                  </button>
                  <Link to="/create-product">
                    <button
                      type="button"
                      className="w-[300px] p-2 h-auto font-bold font-serif  border-green-700 border-2 bg-green-800 text-white rounded-lg hover:bg-transparent hover:border-green-600 hover:text-black transition-all"
                    >
                      Create Products
                    </button>
                  </Link>

                  <div className="flex justify-center items-center">
                    <Link to={"/show-product"}>
                      <button
                        type="button"
                        onClick={showProduct}
                        className="relative bottom-3 w-[200px] font-bold font-serif rounded-lg bg-green-700 text-white h-auto p-1 border-2 border-green-700 "
                      >
                        Show Products
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex justify-center items-center mt-4">
              <div
                className="flex justify-center gap-4 items-center w-[50%] h-auto p-1 border-2 border-slate-400 cursor-pointer"
                onClick={handleDeleteuser}
              >
                <MdDeleteForever size={30} color="red" />
                <h6 className="font-semibold font-serif">
                  Delete Account
                </h6>{" "}
              </div>
              <div
                className="flex justify-center gap-4 items-center w-[50%] h-auto p-1 border-2 border-slate-400 cursor-pointer"
                onClick={handleSignoutuser}
              >
                <CiLogout size={30} color="orange" />
                <h6 className="font-semibold font-serif">Sign Out</h6>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
