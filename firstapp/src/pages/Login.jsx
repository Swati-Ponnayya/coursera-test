import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import "./Login.css";


const Login = () => {
    const navigate = useNavigate();
    // Login Information store
    const [loginInfo, setLoginInfo] = useState({ username: "", pass: "" });
    const handleChangeLogin = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginInfo((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        });
    }
    // forget password
    const handleForgottenPassword = async () => {
        await sendPasswordResetEmail(auth, loginInfo.username)
            .then(function () {
                alert('Please check your email')
            }).catch(function (e) {
                console.log(e)
            })

    }

    // Login form validation
    const [loginFormErrors, setLoginFormError] = useState({});
    const [authorizationError, setauthorizationError] = useState("");
    // const [isLoginSubmit, setisLoginSubmit] = useState(false);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setLoginFormError(validateLogin(loginInfo));
        // setauthorizationError((loginInfo));
        // const res = await signIn(loginInfo);
        // if (res.error) seterror(res.error);
        signInWithEmailAndPassword(auth, loginInfo.username, loginInfo.pass)
            .then((userCredential) => {
                //   console.log(userCredential);
                setLoginInfo("")
                navigate("/")
            })
            .catch((error) => {
                console.log(error.message);
                setauthorizationError(error.message);
                // alert(authorizationError);
            });
    }

    const validateLogin = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = "Username is required";
        }

        if (!values.pass) {
            errors.pass = "Password is required";
        }
        return errors;
    }

    return (
        <div className="login">
            <form>
                <h1>Log In</h1>
                <div>
                    <input type="email" placeholder="Email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" name="username" onChange={handleChangeLogin} value={loginInfo.username} />
                    <p>{loginFormErrors.username}</p>
                </div>
                <div>
                    <input type="password" placeholder="Password" maxLength="10" name="pass" onChange={handleChangeLogin} value={loginInfo.pass} />
                    <p>{loginFormErrors.pass}</p>
                </div>
                <h5 onClick={handleForgottenPassword}>Forget Password </h5>
                <input type="submit" value="Login" onClick={handleSubmitLogin} />
                <p>{authorizationError}</p>
            </form>
            <div>
                {/* {Object.keys(loginFormErrors).length === 0 && isLoginSubmit ? ("g") : ("")} */}
                <h6>Don't have an account <Link to="/signup" >Sign In</Link></h6>
            </div>
        </div>
    );
}
export default Login;