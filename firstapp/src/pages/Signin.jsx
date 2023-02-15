import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataref } from "../firebase/firebase";

const Signin = () => {
    const navigate = useNavigate();

    // Login Information store
    const [signin, setsignin] = useState({ username: "", pass: "" });
    const handleChangeSignin = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setsignin((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        });
    }

    // Login form validation
    const [signinFormsErrors, setSigninFormsErrors] = useState({});
    const [isSigninSubmit, setisSigninSubmit] = useState(false);

    const handleSubmitSignin = (e) => {
        e.preventDefault();
        setSigninFormsErrors(validateSignin(signin));
        setisSigninSubmit(true)
        if (signin !== "" && signin >= 5) {
            dataref.ref().child("all").push(signin)
            setsignin("")
        }
    }

    const validateSignin = (values) => {
        // const regex = 
        const errors = {};
        if (!values.username) {
            errors.username = "Username is required";
        } else if (values.username.length < 5) {
            errors.username = "Username should be greater than 5 letters"
        }

        if (!values.pass) {
            errors.pass = "Password is required";
        } else if (values.pass.length < 5) {
            errors.pass = "Password should be greater than 5 letters"
        } else if (values.pass.length > 10) {
            errors.pass = "Password should be less than 10 letters"
        }
        return errors;
    }

    return (
        <div className="signin">
            <form>
                <h1>Sign In</h1>
                <div>
                    <input type="text" placeholder="User Name" name="username" onChange={handleChangeSignin} value={signin.username} />
                    <p>{signinFormsErrors.username}</p>
                    <p>{signin.username.length != 0 ? (""):("Hint: Username should be greater than 5 letters")}</p>
                </div>
                <div>
                    <input type="password" placeholder="Password" maxLength="10" name="pass" onChange={handleChangeSignin} value={signin.pass} />
                    <p>{signinFormsErrors.pass}</p>
                    <p>{signin.pass.length != 0 ? ("") : ("Hint: Password should be greater than 5 letters & less than 10 letters")}</p>
                </div>
                <input type="submit" value="Signin" onClick={handleSubmitSignin} />
            </form>
            <div>
                {Object.keys(signinFormsErrors).length === 0 && isSigninSubmit ? (navigate("/login")) : ("")}
                <h6>Have an account <Link to="/login" >Log In</Link></h6>
            </div>
        </div>
    );
}
export default Signin;