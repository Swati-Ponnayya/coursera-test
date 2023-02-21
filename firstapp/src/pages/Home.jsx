import React, { useEffect, useState } from "react";
import ingredient from "../Ingredientlist.json";
import { useNavigate } from "react-router-dom";
import './Home.css'

function Home() {
	const navigate = useNavigate();

	// to make an array of ingredient by categories 
	const categorizedData = ingredient.reduce((acc, curr) => {
		const { categories, Name } = curr;

		if (!acc[categories]) {
			acc[categories] = {
				items: [],
			};
		}
		acc[categories].items.push(Name);
		return acc;
	}, {});

	// to create seleted ingredient list 
	const [list, setlist] = useState([]);
	const ing_list = (event) => {
		setlist([...list, event.target.value]);
	}
	// To delete value from seleted ingredient list array  
	const ing_delete = (value) => {
		setlist(list.filter(list => list !== value));
	}
	// to fetch Recipe id 
	// const APIkey =  "3d7009d38e2c4ad8aaa806685013cbd5"
	// const API =` https://api.spoonacular.com/recipes/findByIngredients?apiKey=3d7009d38e2c4ad8aaa806685013cbd5&ingredients=apples,+flour,+sugar`

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [err, setErr] = useState('');
	const [Recipelist, setRecipelist] = useState([]);

	// fetching the Recipe id from api 
	const fetchRecipe = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=3d7009d38e2c4ad8aaa806685013cbd5&ingredients=${list} `);

			if (!response.ok) {
				throw new Error(`Error! status: ${response.status}`);
			}
			const result = await response.json();
			console.log(result)
			result.map((recipes) => {
				setRecipelist((recipe) => [...recipe, recipes.id])
			})

		} catch (err) {
			setErr(err.message);
		} finally {
			setIsLoading(false);
			
		}
	};
	// passing the recipe id to other page 
	
	useEffect(() => {
		if (Recipelist.length > 0)
			navigate("./Recipelist", { state: { id: { Recipelist } } });
	}, [Recipelist]);


	return (
		<div className="main">
			<div className="display">
				<div className="sel_ing">
					{list.map((ing, index) => (
						<button key={index} className="ing_sel " value={ing} onClick={() => ing_delete(ing)} >{ing} </button>
					))}
				</div>
				<div className="find">
					<button onClick={fetchRecipe} >Find Recipe</button>
				</div>
			</div>
			<hr />
			<div className="ing_main">
				<div style={{ color: 'black' }}>
					{err && <h2>{err}</h2>}
					{/* {isLoading && <h2>Loading...</h2>} */}
				</div>

				{Object.keys(categorizedData).map((key, index) => (
					<div key={index} className="Ing_list">
						<div className="ing_head">
							<b>{key}</b>
						</div>
						<div className="Ing">
							{categorizedData[key].items.map((item, index) => (
								<button key={index} value={item} onClick={ing_list}>{item}</button>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;