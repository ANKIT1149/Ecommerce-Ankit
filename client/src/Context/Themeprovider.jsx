/* eslint-disable react/prop-types */
// import React from 'react'
"use strict"

import { useState } from "react"
import ThemeContext from "./ThemeContext";

const Themeprovider = ({children}) => {
    const [mode, setMode] = useState('light');

    const ChangeMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.background = "black";
        }else{
             setMode('light');
             document.body.style.background = "white"
        }
    }
  return (
    <ThemeContext.Provider value={{mode, ChangeMode}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default Themeprovider
