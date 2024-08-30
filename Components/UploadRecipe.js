import React, { useState } from 'react';

const UploadRecipe = ({ userId }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    const recipeData = {
      userId,
      name,
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
      instructions,
      imageUrl,
      prepTime: parseInt(prepTime, 10),
      difficulty,
      cuisine
    };

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        setMessage('Recipe uploaded successfully!');
      } else {
        setMessage('Failed to upload recipe.');
      }
    } catch (error) {
      console.error('Error uploading recipe:', error);
      setMessage('Error uploading recipe.');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Recipe Name"
        required
      />
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (comma-separated)"
        required
      />
      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
        required
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />
      <input
        type="number"
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
        placeholder="Preparation Time (minutes)"
      />
      <input
        type="text"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        placeholder="Difficulty (e.g., easy, medium, hard)"
      />
      <input
        type="text"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        placeholder="Cuisine (e.g., Italian, Mexican)"
      />
      <button type="submit">Upload Recipe</button>
      <p>{message}</p>
    </form>
  );
};

export default UploadRecipe;
