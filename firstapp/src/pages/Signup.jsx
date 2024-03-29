import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/i;
    // Login Information store
    const [signup, setSignup] = useState({ username: "", pass: "" });
    const handleChangeSignup = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSignup((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        });
    }

    // Login form validation
    const [signupFormsErrors, setSignupFormsErrors] = useState({});
    const [issignupSubmit, setisSignupSubmit] = useState(false);

    const handleSubmitsignup = async (e) => {
        e.preventDefault();
        setSignupFormsErrors(validatesignup(signup));
        setisSignupSubmit(true)
        // creating user account
        if (signup !== "" && signup.pass.length >= 6 && signup.username.length >= 6) {
            await createUserWithEmailAndPassword(auth, signup.username, signup.pass)
                .then((userCredential) => {
                    // console.log(userCredential);
                    navigate("/login")
                })
                .catch((error) => {
                    console.log(error);
                    if (error.code === "auth/email-already-in-use") {
                        alert("Email already in use.")
                        window.location.reload();
                    }
                });
            setSignup("")
        }
    }

    const validatesignup = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = "Email is required";
        } else if (values.username.length < 6) {
            errors.username = "Email should be in proper format"
        } else if (!regex.test(values.username)) {
            errors.username = "Email format is invalid";
        }

        if (!values.pass) {
            errors.pass = "Password is required";
        } else if (values.pass.length < 6) {
            errors.pass = "Password should be greater than 6 letters"
        } else if (values.pass.length > 10) {
            errors.pass = "Password should be less than 10 letters"
        } else if (!regex.test(values.pass)) {
            errors.pass = "Password format is invalid";
        }

        return errors;
    }

    return (
        <div className="signup">
            <form>
                <h1>Sign Up</h1>
                <div>
                    <input type="email" placeholder="Email" pattern={regex} name="username" onChange={handleChangeSignup} value={signup.username} />
                    <p>{signupFormsErrors.username ? (signupFormsErrors.username) : signup.username.length !== 0 ? ("") : ("Hint: Email should be in proper format")}</p>
                </div>
                <div>
                    <input type="password" placeholder="Password" pattern='/^[a-z0-9]$/' maxLength="10" name="pass" onChange={handleChangeSignup} value={signup.pass} />
                    <p>{signupFormsErrors.pass ? (signupFormsErrors.pass) : signup.pass.length !== 0 ? ("") : ("Hint: Password should be greater than 6 letters & less than 10 letters")}</p>
                </div>
                <input type="submit" value="signup" onClick={handleSubmitsignup} />
            </form>
            <div>
                {/* {Object.keys(signupFormsErrors).length === 0 && issignupSubmit ? ("hello") : ("")} */}
                <h6>Have an account <Link to="/login" >Log In</Link></h6>
            </div>
        </div>
    );
}
export default Signup;