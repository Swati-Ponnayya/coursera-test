import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Recipelist = () => {
    const { state } = useLocation();
    const { id } = state;
    const [data, setData] = useState([]);
    const list = id.Recipelist;
    console.log(" lit", list);

    list.map(async (idlist) => {
        //console.log(idlist);
        const response = await fetch(`https://api.spoonacular.com/recipes/${idlist}/information?apiKey=3d7009d38e2c4ad8aaa806685013cbd5 `);
        console.log(response);
        //     if (!response.ok) {
        //         //throw new Error(`Error! status: ${response.status}`);
    }
        //    const result = response.json();
        //   setData(result);
        //  console.log(data)
        //}
    );

    return (
        <>
            <p>hi</p>
            {/* <p>{list}</p> */}
        </>
    )
}
export default Recipelist;