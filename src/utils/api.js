import axios from 'axios';

const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const API_BASE_URL = 'https://api.spoonacular.com/recipes';

export const fetchRecipes = async (ingredients) => {
  try {
    // First, search recipes by ingredients
    const searchResponse = await axios.get(`${API_BASE_URL}/findByIngredients`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        ingredients,
        number: 12,
        ranking: 2,
        ignorePantry: true,
      },
    });

    // Get recipe information for each recipe found
    const recipeDetails = await Promise.all(
      searchResponse.data.map(async (recipe) => {
        const detailResponse = await axios.get(`${API_BASE_URL}/${recipe.id}/information`, {
          params: {
            apiKey: SPOONACULAR_API_KEY,
          },
        });
        
        return {
          ...recipe,
          sourceUrl: detailResponse.data.sourceUrl,
          vegetarian: detailResponse.data.vegetarian,
          vegan: detailResponse.data.vegan,
          glutenFree: detailResponse.data.glutenFree,
          protein: detailResponse.data.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount || 0,
        };
      })
    );

    return recipeDetails;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};