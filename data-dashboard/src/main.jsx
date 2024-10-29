import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./routes/Layout";
import RecipeDetail from "./components/RecipeDetail";
import NotFound from "./routes/NotFound";

import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const api_key = import.meta.env.VITE_API_KEY_SPOON;

const Main = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState({
        servings: null,
        calories: null,
    });

    const fetchRecipes = async () => {
        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${api_key}&number=5&includeNutrition=true`
            );
            const data = await response.json();
            setRecipes(data.recipes);
            localStorage.setItem("recipes", JSON.stringify(data.recipes));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const storedRecipes = localStorage.getItem("recipes");
        if (storedRecipes) {
            try {
                setRecipes(JSON.parse(storedRecipes));
            } catch (error) {
                console.error("Error parsing stored recipes:", error);
                fetchRecipes();
            }
        } else {
            fetchRecipes();
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredResults = recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setRecipes(filteredResults);
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

    const handleReset = () => {
        localStorage.removeItem("recipes");
        fetchRecipes();
    };

    return (
        <BrowserRouter>
            <div>
                <button className='reset-button' onClick={handleReset}>
                    Get new recipes
                </button>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Layout
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                handleSearch={handleSearch}
                                selectedFilter={selectedFilter}
                                handleFilter={handleFilter}
                            />
                        }
                    >
                        <Route index element={<App recipes={recipes} />} />
                        <Route
                            path='recipe/:id'
                            element={<RecipeDetail recipes={recipes} />}
                        />
                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Main />
    </StrictMode>
);
