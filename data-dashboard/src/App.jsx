import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import RecipeCard from "./components/RecipeCard";

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
                    `https://api.spoonacular.com/recipes/random?apiKey=${api_key}&number=20&includeNutrition=true`
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
        setSelectedFilter({ servings: null, calories: null }); // Reset filters on new search
    };

    const handleFilter = (type, value) => {
        setSelectedFilter((prevFilter) => {
            const newFilter = {
                ...prevFilter,
                [type]: prevFilter[type] === value ? null : value,
            };
            return newFilter;
        });
    };

    useEffect(() => {
        let filteredResults = recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

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
    }, [selectedFilter, searchQuery, recipes]);

    return (
        <div className='app-container'>
            <Sidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                selectedFilter={selectedFilter}
                handleFilter={handleFilter}
            />
            <div className='main-content'>
                <h1>Today's Recipes</h1>
                <div className='recipe-container'>
                    {searchResults.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
