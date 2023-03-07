import React, { useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import "./Suggestion.css";

function Suggestion() {
    const form = useRef();
    const navigate = useNavigate();
    const sendEmail = (event) => {
        event.preventDefault();
        emailjs.sendForm('service_wv5adxd', 'template_uo5g3dg', form.current, 'nJRZV4gYir0iIzzKq')
            .then((result) => {
                alert("Thanks for submitting the suggestion")
                navigate("/")
                // show the user a success message
            }, (error) => {
                // show the user an error
            });
    };
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        };
    }, []);

    return (
        <>
            <Link to="/" className='backH'><h4>&lt; Home</h4></Link>
            <div className="Suggestion">
                <form ref={form}>
                    <h1>Suggestion</h1>
                    <div>
                        {authUser ? (
                            <div>
                                <input type='email' value={authUser.email} readOnly name="from_name"></input>
                                <textarea placeholder="Write Suggestion" name="message"></textarea>
                                <input type='submit' value="Submit" onClick={(event) => sendEmail(event)}></input>
                            </div>
                        ) : (
                            <h3> You have to <Link to='/login'>Login</Link> to write suggestion</h3>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}

export default Suggestion;