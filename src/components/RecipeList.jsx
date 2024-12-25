import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCard from './AnimatedCard';
import RecipeCard from './RecipeCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const RecipeList = ({ recipes }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {recipes.map((recipe, index) => (
        <AnimatedCard key={recipe.id} delay={index * 0.1}>
          <RecipeCard recipe={recipe} />
        </AnimatedCard>
      ))}
    </motion.div>
  );
};

export default RecipeList;