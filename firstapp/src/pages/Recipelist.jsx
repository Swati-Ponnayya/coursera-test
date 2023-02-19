import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Recipelist = () => {
    const { state } = useLocation();
    const { id } = state;
    const [data, setData] = useState([]);
    // const list = id.Recipelist;
    // console.log(" lit", list);

    // list.map(async (idlist) => {
        //console.log(idlist);
        // key=06e11784ffa24751bc11bfd891a93ca3
        const response =  fetch(`https://api.spoonacular.com/recipes/157991/information?apiKey=06e11784ffa24751bc11bfd891a93ca3 `);
        // console.log(response);
        // if (!response.ok) {
        //     throw new Error(`Error! status: ${response.status}`);
        // }
        const result = response.json();
        setData(result);
        //  console.log(data)
    // }
    // );

    return (
        <>
            <p>hi</p>
            {/* <p>{list}</p> onClick={Rlist.sourceUrl}*/}
        </>
    )
}
export default Recipelist;