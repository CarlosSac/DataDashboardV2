import { useState, useEffect } from "react";
import "./App.css";

const api_key = import.meta.env.VITE_API_KEY_SPOON;

function App() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${api_key}&number=5`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("API Response:", data);
                setRecipes(data.recipes);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>Random Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
