import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Recipelist = () => {
    const [err, setErr] = useState('');
    const [data, setData] = useState([]);

    // key=da1d576ade9846be99f6a854ae590ac0  3d7009d38e2c4ad8aaa806685013cbd5
    useEffect(() => {
        const data2 = async () => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/information?apiKey=da1d576ade9846be99f6a854ae590ac0 `);
                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }
                const result = await response.json();
                setData((recipe) => [...recipe, result])
            } catch (err) {
                setErr(err.message);
            }

        }; data2();
    }, [])
    // console.log(data)

    return (
        <>
            <Link to="/" className='backH'><h4>&lt; Home</h4></Link>
            <div className='Display_R'>
                {err && <h3>{err}</h3>}
                {data.map((data1, index) => {
                    return (
                        <div key={index} className="RecipesList">
                            <Link to={data1.spoonacularSourceUrl}>
                                <img src={data1.image} height="100px" alt={data1.title} />
                                <h3 >{data1.title}</h3>
                                <p>Cooking Time :-  {data1.readyInMinutes} mintues</p>
                                <p>Serving :-  {data1.servings} person</p>
                                {/* {miss_ing}
                                {miss_ing.map((m_ing, index) => {
                                    return <p key={index}>{m_ing}</p>
                                })} */}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Recipelist;