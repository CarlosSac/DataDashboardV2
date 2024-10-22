import React from "react";

const RecipeCard = ({ recipe }) => {
    return (
        <div className='recipe-card'>
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
    );
};

export default RecipeCard;
