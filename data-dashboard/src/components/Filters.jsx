import React from "react";

const Filters = ({ selectedFilter, handleFilter }) => {
    return (
        <div className='filters'>
            <h3>Servings</h3>
            <button
                className={selectedFilter.servings === "1-2" ? "active" : ""}
                onClick={() => handleFilter("servings", "1-2")}
            >
                1-2
            </button>
            <button
                className={selectedFilter.servings === "3-4" ? "active" : ""}
                onClick={() => handleFilter("servings", "3-4")}
            >
                3-4
            </button>
            <button
                className={selectedFilter.servings === "5+" ? "active" : ""}
                onClick={() => handleFilter("servings", "5+")}
            >
                5+
            </button>
            <h3>Calories</h3>
            <button
                className={selectedFilter.calories === "<200" ? "active" : ""}
                onClick={() => handleFilter("calories", "<200")}
            >
                {"<200"}
            </button>
            <button
                className={
                    selectedFilter.calories === "200-500" ? "active" : ""
                }
                onClick={() => handleFilter("calories", "200-500")}
            >
                200-500
            </button>
            <button
                className={selectedFilter.calories === ">500" ? "active" : ""}
                onClick={() => handleFilter("calories", ">500")}
            >
                {">500"}
            </button>
        </div>
    );
};

export default Filters;
