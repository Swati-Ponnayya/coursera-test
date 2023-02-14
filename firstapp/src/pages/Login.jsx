import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate= useNavigate ();
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

    // Login form validation
    const [loginFormErrors, setLoginFormError] = useState({});
    const [authorizationError, setauthorizationError] = useState({});
    const [isLoginSubmit, setisLoginSubmit] = useState(false);

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoginFormError(validateLogin(loginInfo));
        setauthorizationError(authorize(loginInfo));
    }

    const authorize = (values) => {
        const errors = {};
        if (values.username !== "" && values.pass !== "") {
            if (values.username === "admin" && values.pass === "admin") {
                setisLoginSubmit(true);
            } else {
                errors.errorText = "Wrong Email ID or Password";
            }
        }
        return errors;
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
                    <input type="text" placeholder="User Name" name="username" onChange={handleChangeLogin} value={loginInfo.username} />
                    <p>{loginFormErrors.username}</p>
                </div>
                <div>
                    <input type="password" placeholder="Password" maxLength="10" name="pass" onChange={handleChangeLogin} value={loginInfo.pass} />
                    <p>{loginFormErrors.pass}</p>
                </div>
                <input type="submit" value="Login" onClick={handleSubmitLogin} />
                <p>{authorizationError.errorText}</p>
            </form>
            <div>
                {Object.keys(loginFormErrors).length === 0 && isLoginSubmit ? (navigate("/",{state:{name: loginInfo.username}})) : ("")}
                <h6>Don't have an account <Link to="/signin" >Sign In</Link></h6>
            </div>
        </div>
    );
}
export default Login;