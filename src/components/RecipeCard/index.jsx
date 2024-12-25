import React from 'react';
import RecipeHeader from './RecipeHeader';
import IngredientList from './IngredientList';
import RecipeFooter from './RecipeFooter';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card group">
      <RecipeHeader image={recipe.image} title={recipe.title} />
      
      <div className="p-6 space-y-4">
        <IngredientList 
          title="Available Ingredients" 
          ingredients={recipe.usedIngredients} 
        />
        <IngredientList 
          title="Missing Ingredients" 
          ingredients={recipe.missedIngredients} 
        />
        <RecipeFooter 
          missedIngredientCount={recipe.missedIngredientCount}
          sourceUrl={recipe.sourceUrl}
        />
      </div>
    </div>
  );
};

export default RecipeCard;