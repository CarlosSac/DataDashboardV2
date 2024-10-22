import { useState, useEffect } from "react";
import "./App.css";

const api_key = import.meta.env.VITE_API_KEY_SPOON;

function App() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({
        servings: null,
        calories: null,
    });

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/random?apiKey=${api_key}&number=15&includeNutrition=true`
                );
                const data = await response.json();
                console.log("API Response:", data);
                setRecipes(data.recipes);
                setSearchResults(data.recipes); // Initialize search results with all recipes
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchRecipes();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredResults = recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const handleFilter = (type, value) => {
        setSelectedFilter((prevFilter) => {
            const newFilter = {
                ...prevFilter,
                [type]: prevFilter[type] === value ? null : value,
            };
            let filteredResults = recipes;

            if (newFilter.servings) {
                switch (newFilter.servings) {
                    case "1-2":
                        filteredResults = filteredResults.filter(
                            (recipe) =>
                                recipe.servings >= 1 && recipe.servings <= 2
                        );
                        break;
                    case "3-4":
                        filteredResults = filteredResults.filter(
                            (recipe) =>
                                recipe.servings >= 3 && recipe.servings <= 4
                        );
                        break;
                    case "5+":
                        filteredResults = filteredResults.filter(
                            (recipe) => recipe.servings >= 5
                        );
                        break;
                    default:
                        break;
                }
            }

            if (newFilter.calories) {
                switch (newFilter.calories) {
                    case "<200":
                        filteredResults = filteredResults.filter(
                            (recipe) =>
                                recipe.nutrition?.nutrients?.find(
                                    (n) => n.name === "Calories"
                                )?.amount < 200
                        );
                        break;
                    case "200-500":
                        filteredResults = filteredResults.filter(
                            (recipe) =>
                                recipe.nutrition?.nutrients?.find(
                                    (n) => n.name === "Calories"
                                )?.amount >= 200 &&
                                recipe.nutrition?.nutrients?.find(
                                    (n) => n.name === "Calories"
                                )?.amount <= 500
                        );
                        break;
                    case ">500":
                        filteredResults = filteredResults.filter(
                            (recipe) =>
                                recipe.nutrition?.nutrients?.find(
                                    (n) => n.name === "Calories"
                                )?.amount > 500
                        );
                        break;
                    default:
                        break;
                }
            }

            return newFilter;
        });
    };

    useEffect(() => {
        let filteredResults = recipes;

        if (selectedFilter.servings) {
            switch (selectedFilter.servings) {
                case "1-2":
                    filteredResults = filteredResults.filter(
                        (recipe) => recipe.servings >= 1 && recipe.servings <= 2
                    );
                    break;
                case "3-4":
                    filteredResults = filteredResults.filter(
                        (recipe) => recipe.servings >= 3 && recipe.servings <= 4
                    );
                    break;
                case "5+":
                    filteredResults = filteredResults.filter(
                        (recipe) => recipe.servings >= 5
                    );
                    break;
                default:
                    break;
            }
        }

        if (selectedFilter.calories) {
            switch (selectedFilter.calories) {
                case "<200":
                    filteredResults = filteredResults.filter(
                        (recipe) =>
                            recipe.nutrition?.nutrients?.find(
                                (n) => n.name === "Calories"
                            )?.amount < 200
                    );
                    break;
                case "200-500":
                    filteredResults = filteredResults.filter(
                        (recipe) =>
                            recipe.nutrition?.nutrients?.find(
                                (n) => n.name === "Calories"
                            )?.amount >= 200 &&
                            recipe.nutrition?.nutrients?.find(
                                (n) => n.name === "Calories"
                            )?.amount <= 500
                    );
                    break;
                case ">500":
                    filteredResults = filteredResults.filter(
                        (recipe) =>
                            recipe.nutrition?.nutrients?.find(
                                (n) => n.name === "Calories"
                            )?.amount > 500
                    );
                    break;
                default:
                    break;
            }
        }

        setSearchResults(filteredResults);
    }, [selectedFilter, recipes]);

    return (
        <div className='app-container'>
            <aside className='sidebar'>
                <h2>Search Recipes</h2>
                <form onSubmit={handleSearch} className='search-form'>
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search for a recipe...'
                    />
                    <button type='submit'>Search</button>
                </form>
                <div className='filters'>
                    <h3>Servings</h3>
                    <button
                        className={
                            selectedFilter.servings === "1-2" ? "active" : ""
                        }
                        onClick={() => handleFilter("servings", "1-2")}
                    >
                        1-2
                    </button>
                    <button
                        className={
                            selectedFilter.servings === "3-4" ? "active" : ""
                        }
                        onClick={() => handleFilter("servings", "3-4")}
                    >
                        3-4
                    </button>
                    <button
                        className={
                            selectedFilter.servings === "5+" ? "active" : ""
                        }
                        onClick={() => handleFilter("servings", "5+")}
                    >
                        5+
                    </button>
                    <h3>Calories</h3>
                    <button
                        className={
                            selectedFilter.calories === "<200" ? "active" : ""
                        }
                        onClick={() => handleFilter("calories", "<200")}
                    >
                        {"<200"}
                    </button>
                    <button
                        className={
                            selectedFilter.calories === "200-500"
                                ? "active"
                                : ""
                        }
                        onClick={() => handleFilter("calories", "200-500")}
                    >
                        200-500
                    </button>
                    <button
                        className={
                            selectedFilter.calories === ">500" ? "active" : ""
                        }
                        onClick={() => handleFilter("calories", ">500")}
                    >
                        {">500"}
                    </button>
                </div>
            </aside>
            <div className='main-content'>
                <h1>Today's Recipes</h1>
                <div className='recipe-container'>
                    {searchResults.map((recipe) => (
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
        </div>
    );
}

export default App;
