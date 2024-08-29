import React, { useState } from 'react';

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/recipes/search?ingredients=${encodeURIComponent(ingredients)}`);
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
      <button onClick={handleSearch}>Search</button>
      
      <div>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id}>
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
