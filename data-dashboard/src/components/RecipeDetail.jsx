import React from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = ({ recipes }) => {
    const { id } = useParams();
    const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div className='recipe-detail-card-container '>
            <div className='recipe-detail-card'>
                <h2>{recipe.title}</h2>
                <img src={recipe.image} alt={recipe.title} />
                <h3>Servings: {recipe.servings}</h3>
                <h3>Ready in: {recipe.readyInMinutes} minutes</h3>
                <h3>
                    Calories:{" "}
                    {
                        recipe.nutrition?.nutrients?.find(
                            (n) => n.name === "Calories"
                        )?.amount
                    }
                </h3>
                <div
                    dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
            </div>
        </div>
    );
};

export default RecipeDetail;
