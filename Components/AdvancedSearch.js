import React, { useState } from 'react';

const AdvancedSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [maxPrepTime, setMaxPrepTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    const query = new URLSearchParams();
    if (ingredients) query.append('ingredients', ingredients.split(','));
    if (maxPrepTime) query.append('maxPrepTime', maxPrepTime);
    if (difficulty) query.append('difficulty', difficulty);
    if (cuisine) query.append('cuisine', cuisine);

    try {
      const response = await fetch(`/api/recipes/search?${query.toString()}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={ingredients} 
        onChange={(e) => setIngredients(e.target.value)} 
        placeholder="Enter ingredients separated by commas" 
      />
      <input 
        type="number" 
        value={maxPrepTime} 
        onChange={(e) => setMaxPrepTime(e.target.value)} 
        placeholder="Max preparation time (minutes)" 
      />
      <input 
        type="text" 
        value={difficulty} 
        onChange={(e) => setDifficulty(e.target.value)} 
        placeholder="Difficulty level (e.g., easy, medium, hard)" 
      />
      <input 
        type="text" 
        value={cuisine} 
        onChange={(e) => setCuisine(e.target.value)} 
        placeholder="Cuisine type (e.g., Italian, Mexican)" 
      />
      <button onClick={handleSearch}>Search</button>
      
      <div>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id}>
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
              <p>Prep Time: {recipe.prep_time} minutes</p>
              <p>Difficulty: {recipe.difficulty}</p>
              <p>Cuisine: {recipe.cuisine}</p>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
