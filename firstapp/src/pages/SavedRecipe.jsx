import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from "../firebase/firebase";
import { ref, onValue, remove } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import "./SavedRecipe.css";

const SavedRecipe = () => {
    const [err, setErr] = useState('');
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [authUser, setAuthUser] = useState(null);
    var currentuser = "";
    let records = []

    useEffect(() => {
        // to get the current user uid
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                currentuser = user.uid;
            } else {
                setAuthUser(null);
            }
        });

        const data2 = async () => {
            let key = []
            await onValue(ref(db, `${currentuser}/`), (snapshot) => {
                // to get data acc too user uid
                snapshot.forEach(childSnap => {
                    const datak = childSnap.key
                    // const data = childSnap.val()
                    childSnap.forEach(ad => {
                        key = ad.key
                        const data = ad.val().Saved_R
                        if (datak === currentuser) {
                            records.push({ data });
                        }
                    })
                })
                console.log(records)
                if (records !== null) {
                    Object.values(records).map(async (todo) => {
                        setList((oldArray) => [...oldArray, todo])
                        try {
                            // key=da1d576ade9846be99f6a854ae590ac0  3d7009d38e2c4ad8aaa806685013cbd5   49785da206294648950f3afd48bb48ca
                            const response = await fetch(`https://api.spoonacular.com/recipes/${todo.data}/information?apiKey=49785da206294648950f3afd48bb48ca `);
                            if (!response.ok) {
                                throw new Error(`Error! status: ${response.status}`);
                            }
                            const result = await response.json();
                            // add recipe details and key to delete the recipe
                            setData((recipe) => [...recipe, { result, key }])
                        } catch (err) {
                            setErr(err.message);
                        }
                    });
                }
            });
        };
        data2();
        return () => {
            listen();
        };
    }, [])

    //  to remove the recipe from the list
    const D_recipe = async (todo) => {
        console.log(authUser.uid);
        await remove(ref(db, `${authUser.uid}/${todo}`));
        alert("Removed from saved Recipe")
        window.location.reload();
    };

    return (
        <>
            <Link to="/" className='backH'><h4>&lt; Home</h4></Link>
            <div className='Display_R'>
                {authUser ? (
                    <>
                        {err ? (<h3>{err}</h3>) : (list.length > 0 ? '' : <h3>Not Saved recipe</h3>)}
                        {data.map((data1, index) => {
                            return (
                                <div key={index} className="RecipesList">
                                    <button onClick={() => D_recipe(data1.key)} className="Delete" >Delete</button>
                                    <img src={data1.result.image} height="100px" alt={data1.title} />
                                    <Link to={data1.result.spoonacularSourceUrl}>
                                        <h3 >{data1.result.title}</h3>
                                    </Link>
                                    <p>Cooking Time :-  {data1.result.readyInMinutes} mintues</p>
                                    <p>Serving :-  {data1.result.servings} person</p>

                                </div>
                            )
                        })}
                    </>
                ) : (
                    <h2>You have to <Link to="/login">Login</Link> to see saved recipes  </h2>
                )}
            </div>
        </>
    )
}
export default SavedRecipe;