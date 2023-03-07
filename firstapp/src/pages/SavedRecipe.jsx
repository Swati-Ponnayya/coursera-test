import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from "../firebase/firebase";
import { ref, onValue, remove, child } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import "./Recipelist.css";

const SavedRecipe = () => {
    const [err, setErr] = useState('');
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    // key=da1d576ade9846be99f6a854ae590ac0  3d7009d38e2c4ad8aaa806685013cbd5   49785da206294648950f3afd48bb48ca
    const [authUser, setAuthUser] = useState(null);
    const [array, setarray] = useState(0);
    var currentuser = "";

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
            await onValue(ref(db, `${currentuser}/`), (snapshot) => {
                let records = []
                // to get data acc too user uid
                snapshot.forEach(childSnap => {
                    const datak = childSnap.key
                    const data = childSnap.val()
                    console.log(datak)

                    if (datak === currentuser) {
                        records.push({ data });
                    }
                })
                if (records !== null) {
                    Object.values(records).map(async (todo) => {
                        setList((oldArray) => [...oldArray, todo])
                        console.log(todo.data.Saved_R)
                        try {
                            // if the length of the saved recipe is equal to 1
                            if ((todo.data.Saved_R).length === 1) {
                                const response = await fetch(`https://api.spoonacular.com/recipes/${todo.data.Saved_R}/information?apiKey=49785da206294648950f3afd48bb48ca `);
                                console.log("in", todo.data.Saved_R)
                                if (!response.ok) {
                                    throw new Error(`Error! status: ${response.status}`);
                                }
                                const result = await response.json();
                                setData((recipe) => [result])

                            }
                            // if the length of the saved recipe is more than 1
                            else if ((todo.data.Saved_R).length > 1) {
                                todo.data.Saved_R.map(async (Id) => {
                                    console.log("2", Id)
                                    const response = await fetch(`https://api.spoonacular.com/recipes/${Id}/information?apiKey=49785da206294648950f3afd48bb48ca `);
                                    if (!response.ok) {
                                        throw new Error(`Error! status: ${response.status}`);
                                    }
                                    const result = await response.json();
                                    setData((recipe) => [...recipe, result])
                                })
                            }
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
    const D_recipe = (todo) => {
        remove(ref(db, `${currentuser}/` + `${todo}`));
        console.log(todo)
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
                                    <img src={data1.image} height="100px" alt={data1.title} />
                                    {/* {list.map((todo) => { */}
                                    <button style={{ float: "right" }} onClick={() => D_recipe(data1.id)}>delete</button>
                                    {/* })} */}
                                    <Link to={data1.spoonacularSourceUrl}>
                                        <h3 >{data1.title}</h3>
                                        <p>Cooking Time :-  {data1.readyInMinutes} mintues</p>
                                        <p>Serving :-  {data1.servings} person</p>
                                    </Link>
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