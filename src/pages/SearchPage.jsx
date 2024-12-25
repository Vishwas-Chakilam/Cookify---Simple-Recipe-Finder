import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import RecipeList from '../components/RecipeList';
import LoadingSpinner from '../components/LoadingSpinner';
import PageTransition from '../components/PageTransition';
import { fetchRecipes } from '../utils/api';
import { applyFilters } from '../utils/filters';
import { saveSearch } from '../utils/historyStorage';

function SearchPage() {
  const location = useLocation();
  const [ingredients, setIngredients] = useState(location.state?.ingredients || '');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    highProtein: false,
  });

  const searchRecipes = async () => {
    if (!ingredients.trim()) {
      setError('Please enter ingredients');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const recipeData = await fetchRecipes(ingredients);
      const filteredRecipes = applyFilters(recipeData, filters);
      setRecipes(filteredRecipes);
      saveSearch(ingredients);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      highProtein: false,
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Recipe Search</h1>
            <p className="text-gray-600 mb-8">
              Enter ingredients you have and discover delicious recipes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center space-y-6"
          >
            <SearchBar
              ingredients={ingredients}
              setIngredients={setIngredients}
              onSearch={searchRecipes}
            />
            
            <Filters
              filters={filters}
              setFilters={setFilters}
              onReset={resetFilters}
            />
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center"
            >
              {error}
            </motion.div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <RecipeList recipes={recipes} />
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default SearchPage;