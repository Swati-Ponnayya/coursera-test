import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as MdIcons from 'react-icons/md';
import { db } from "../firebase/firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set, ref, } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import "./Recipelist.css";

const Recipelist = () => {
    // const { state } = useLocation();
    // const { id } = state;
    const [err, setErr] = useState('');
    const [data, setData] = useState([]);
    // const list = id.Recipelist;
    const list = [639672, 639673]
    const [Saved_R, setsaved_R] = useState([]);
    const [authUser, setAuthUser] = useState(null);
    const [array, setarray] = useState(0);

    // key=da1d576ade9846be99f6a854ae590ac0  3d7009d38e2c4ad8aaa806685013cbd5   49785da206294648950f3afd48bb48ca
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        const data2 = () => {
            list.map(async (idlist) => {
                // console.log(idlist)
                try {
                    const response = await fetch(`https://api.spoonacular.com/recipes/${idlist}/information?apiKey=49785da206294648950f3afd48bb48ca `);
                    if (!response.ok) {
                        throw new Error(`Error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    setData((recipe) => [...recipe, result])

                } catch (err) {
                    setErr(err.message);
                }
            });
        }; data2();

    }, [])

    // store
    const S_recipe = (recipe_id) => {
        setsaved_R((Srecipe) => [...Srecipe, recipe_id]);
        // if (recipe_id === Saved_R)
        //     alert("Already saved")
        // else 
        console.log(Saved_R)
        if (Saved_R == '') {
            toast.warning('Try Again', { autoClose: 2000 })
        }
        {
            {
                authUser ? (
                    set(ref(db, `${auth.currentUser.uid}`), {
                        Saved_R
                    })
                ) : (
                    alert("To save recipe you have to login")
                )
            }
        }
    }
    return (
        <>
            <Link to="/" className='backH'><h4>&lt; Home</h4></Link>
            <div className='Display_R'>
                {err && <h3>{err}</h3>}
                {data.map((data1, index) => {
                    return (
                        <div key={index} className="RecipesList">
                            <img src={data1.image} height="100px" alt={data1.title} />
                            <button style={{ float: "right" }} onClick={() => S_recipe(data1.id)} className="Save">Save</button>
                            <Link to={data1.spoonacularSourceUrl}>
                                <h3 >{data1.title}</h3>
                                <p>Cooking Time :-  {data1.readyInMinutes} mintues</p>
                                <p>Serving :-  {data1.servings} person</p>
                            </Link>
                        </div>
                    )
                })}
            </div>

        </>
    )
}
export default Recipelist;