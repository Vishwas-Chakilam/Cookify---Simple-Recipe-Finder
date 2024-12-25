import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaHeart, FaBookOpen } from 'react-icons/fa';
import { FaCoffee, FaHamburger, FaPizzaSlice } from 'react-icons/fa';

const quotes = [
  'Cooking is like love. It should be entered into with abandon or not at all.',
  'People who love to eat are always the best people.',
];

const recipeSuggestions = {
  breakfast: 'Try a delicious Avocado Toast with a cup of coffee.',
  lunch: 'How about a refreshing Caesar Salad with grilled chicken?',
  dinner: 'End your day with a classic Spaghetti Bolognese.',
};

const quizQuestions = [
  {
    question: 'What is the main ingredient in a traditional French baguette?',
    options: ['Flour', 'Butter', 'Eggs', 'Rice'],
    correctAnswer: 'Flour',
  },
  {
    question: 'Which country is famous for sushi?',
    options: ['China', 'Japan', 'Korea', 'India'],
    correctAnswer: 'Japan',
  },
  {
    question:
      'What is the name of the Italian dish made of layers of pasta, meat, and cheese?',
    options: ['Lasagna', 'Pizza', 'Risotto', 'Pasta Primavera'],
    correctAnswer: 'Lasagna',
  },
  {
    question:
      'Which of the following is used to make a traditional Japanese sushi roll?',
    options: ['Nori', 'Bacon', 'Avocado', 'Lettuce'],
    correctAnswer: 'Nori',
  },
  {
    question: 'What type of food is guacamole made from?',
    options: ['Avocado', 'Tomato', 'Cucumber', 'Potato'],
    correctAnswer: 'Avocado',
  },
  {
    question: 'Which country is known for the creation of pizza?',
    options: ['France', 'Italy', 'Greece', 'Spain'],
    correctAnswer: 'Italy',
  },
  {
    question:
      'What ingredient is used to make a traditional French ratatouille?',
    options: ['Eggplant', 'Carrot', 'Cucumber', 'Potato'],
    correctAnswer: 'Eggplant',
  },
  {
    question:
      'What type of cheese is traditionally used in a Caesar salad dressing?',
    options: ['Parmesan', 'Cheddar', 'Mozzarella', 'Feta'],
    correctAnswer: 'Parmesan',
  },
  {
    question: 'Which fruit is used to make traditional British apple pie?',
    options: ['Apple', 'Banana', 'Peach', 'Pear'],
    correctAnswer: 'Apple',
  },
  {
    question: 'What is the key ingredient in a smoothie?',
    options: ['Fruit', 'Flour', 'Rice', 'Meat'],
    correctAnswer: 'Fruit',
  },
];

const HomePage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Greet User Based on Time
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Suggest Recipe Based on Time
  const getRecipeSuggestion = () => {
    const hours = new Date().getHours();
    if (hours < 11) {
      return {
        suggestion: recipeSuggestions.breakfast,
        icon: <FaCoffee className="mx-auto text-4xl text-orange-500 mb-4" />,
      };
    }
    if (hours < 17) {
      return {
        suggestion: recipeSuggestions.lunch,
        icon: <FaHamburger className="mx-auto text-4xl text-orange-500 mb-4" />,
      };
    }
    return {
      suggestion: recipeSuggestions.dinner,
      icon: <FaPizzaSlice className="mx-auto text-4xl text-orange-500 mb-4" />,
    };
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {getGreeting()}!
          </h1>
          <p className="text-xl text-gray-600">
            Discover delicious recipes with ingredients you already have
          </p>
        </div>

        <div className="text-center mb-8">
          <p className="text-xl font-semibold text-gray-700">
            Based on the time of day, here's a recipe suggestion for you:
          </p>
        </div>
        {/* Recipe Suggestions Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-16">
          <div className="text-l font-bold mb-6 text-center">
            {getRecipeSuggestion().icon}
            <h3 className="text-xl font-semibold mb-2">Recipe Suggestion</h3>
            <p className="text-gray-600">{getRecipeSuggestion().suggestion}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaUtensils className="mx-auto text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              Simply enter your ingredients and find matching recipes
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaHeart className="mx-auto text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Save Favorites</h3>
            <p className="text-gray-600">
              Keep track of your favorite recipes for quick access
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaBookOpen className="mx-auto text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Recipe History</h3>
            <p className="text-gray-600">
              View your recently viewed and tried recipes
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Cooking Inspiration
          </h2>
          <div className="space-y-6">
            {quotes.map((quote, index) => (
              <blockquote
                key={index}
                className="italic text-gray-600 text-center border-l-4 border-orange-500 pl-4"
              >
                "{quote}"
              </blockquote>
            ))}
          </div>
        </div>

        {/* Quiz Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Test Your Cooking Knowledge!
          </h2>
          {quizCompleted ? (
            <div className="text-center">
              <p className="text-xl font-semibold">
                Your Score: {score} / {quizQuestions.length}
              </p>
              <Link
                to="/"
                className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors mt-4"
              >
                Try Again
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-lg font-semibold mb-4">
                {quizQuestions[currentQuestionIndex].question}
              </p>
              <div className="space-y-4">
                {quizQuestions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <label key={index} className="block">
                      <input
                        type="radio"
                        name="quizOption"
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={handleSubmitAnswer}
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  {currentQuestionIndex < quizQuestions.length - 1
                    ? 'Next Question'
                    : 'Finish Quiz'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            to="/search"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Start Searching Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
