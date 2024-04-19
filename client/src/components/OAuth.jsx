// import React from 'react'

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../Firebase";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import { signInSuccess } from "../Redux/User/Userslice";
import {toast} from 'react-toastify';

const OAuth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuthentication = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();

      const auth = new getAuth(app);

      const result = await signInWithPopup(auth, provider);
       console.log(result)

      const res = await fetch('/api/auth/google', {
         method: 'POST',
         headers: {
           'Content-Type' : 'application/json'
         },

         body: JSON.stringify({
           name: result.user.displayName,
           email: result.user.email,
           photo: result.user.photoURL,
         })
      })

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/')
      toast.success('Login SUccesssfully with Google')
    } catch (error) {
      console.log(error)
      toast.error("Login failed")
    }
  };
  return (
    <div>
      <button
        onClick={handleGoogleAuthentication}
        type="button"
        className="w-[300px] h-[40px] border-2 bg-slate-200 hover:bg-transparent cursor-pointer transition-all text-black font-semibold font-serif"
      >
        Log in With Google
      </button>
    </div>
  );
};

export default OAuth;
