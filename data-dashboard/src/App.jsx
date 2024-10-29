import { useState, useEffect } from "react";
import "./App.css";
import RecipeCard from "./components/RecipeCard";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function App({ recipes }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({
        servings: null,
        calories: null,
    });

    useEffect(() => {
        setSearchResults(recipes); // Initialize search results with all recipes
    }, [recipes]);

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
    }, [searchQuery, selectedFilter, recipes]);

    // Prepare data for the Bar Chart
    const calorieRanges = [
        { range: "<200", count: 0 },
        { range: "200-500", count: 0 },
        { range: ">500", count: 0 },
    ];

    searchResults.forEach((recipe) => {
        const calories = recipe.nutrition?.nutrients?.find(
            (n) => n.name === "Calories"
        )?.amount;

        if (calories < 200) {
            calorieRanges[0].count += 1;
        } else if (calories >= 200 && calories <= 500) {
            calorieRanges[1].count += 1;
        } else if (calories > 500) {
            calorieRanges[2].count += 1;
        }
    });

    return (
        <div className='app-content'>
            <div className='recipe-list'>
                <h1>Today's Recipes</h1>
                <div className='recipe-container'>
                    {searchResults.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
            <div className='chart-card'>
                <h2>Recipe Calorie Distribution</h2>
                <ResponsiveContainer width='100%' height={200}>
                    <BarChart data={calorieRanges}>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='range' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='count' fill='#007bff' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default App;
