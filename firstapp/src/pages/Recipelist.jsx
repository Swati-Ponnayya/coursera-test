import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Recipelist = () => {
    const { state } = useLocation();
    const { id } = state;
    const [data, setData] = useState([]);
    // const list = id.Recipelist;
    // console.log(" lit", list);
    const list = [157991, 157991];
    // const [result, setresult] = useState([]);


    //console.log(idlist);
    // key=06e11784ffa24751bc11bfd891a93ca3  3d7009d38e2c4ad8aaa806685013cbd5
    useEffect(() => {
        list.map(async (idlist) => {
            const response = await fetch(`https://api.spoonacular.com/recipes/${idlist}/information?apiKey=3d7009d38e2c4ad8aaa806685013cbd5 `);
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            // setData(response.json());
            setData(result);
            console.log(data)
            // console.log(data)
        });
    },[])
    // console.log(response);


    return (
        <>
            <p>hi</p>
            {data.map((data1)=>{
                <p>{data1.id} </p>
            })}
            {/* <p>{list.id}</p>*/}
        </>
    )
}
export default Recipelist;