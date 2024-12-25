import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHistory, FaTrash } from 'react-icons/fa';
import HistoryList from '../components/HistoryList';
import { getSearchHistory, clearHistory } from '../utils/historyStorage';

const HistoryPage = () => {
  const [searches, setSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSearches(getSearchHistory());
  }, []);

  const handleSearchAgain = (ingredients) => {
    navigate('/search', { state: { ingredients } });
  };

  const handleClearHistory = () => {
    clearHistory();
    setSearches([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <FaHistory className="text-3xl text-orange-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Search History</h1>
          </div>
          {searches.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center px-4 py-2 text-red-500 hover:text-red-600 
                       hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaTrash className="mr-2" />
              Clear History
            </button>
          )}
        </div>

        <HistoryList searches={searches} onSearchAgain={handleSearchAgain} />
      </div>
    </div>
  );
};

export default HistoryPage;
