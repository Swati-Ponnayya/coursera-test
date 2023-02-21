
import { signOut } from "firebase/auth";
// import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Signout = () => {

    const navigate = useNavigate();
    signOut(auth)
        .then(() => {
            // console.log("sign out successful");
            navigate("/")
            alert("Sign out successfully")
        })
        .catch((error) => console.log(error));

};
export default Signout;