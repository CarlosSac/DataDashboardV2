import { useState, useEffect } from "react";
import "./App.css";

const api_key = import.meta.env.VITE_API_KEY_SPOON;

function App() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/random?apiKey=${api_key}&number=5&includeNutrition=true`
                );
                const data = await response.json();
                console.log("API Response:", data);
                setRecipes(data.recipes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div>
            <h1>Today's Recipes</h1>
            <div className='recipe-container'>
                {recipes.map((recipe) => (
                    <div key={recipe.id} className='recipe-card'>
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className='recipe-image'
                        />
                        <div className='recipe-details'>
                            <h3>{recipe.title}</h3>
                            <p>Servings: {recipe.servings}</p>
                            <p>Ready in: {recipe.readyInMinutes} minutes</p>
                            <p>
                                Calories:{" "}
                                {
                                    recipe.nutrition?.nutrients?.find(
                                        (n) => n.name === "Calories"
                                    )?.amount
                                }
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
