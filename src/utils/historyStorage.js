const HISTORY_KEY = 'recipe_search_history';
const MAX_HISTORY_ITEMS = 10;

export const saveSearch = (ingredients) => {
  const history = getSearchHistory();
  const newSearch = {
    id: Date.now(),
    date: new Date().toISOString(),
    ingredients,
  };

  // Add new search at the beginning and limit to MAX_HISTORY_ITEMS
  const updatedHistory = [newSearch, ...history].slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  return newSearch;
};

export const getSearchHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};