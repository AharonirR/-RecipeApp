import React from 'react';

const FavoriteButton = ({ userId, recipeId }) => {
  const handleAddFavorite = async () => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, recipeId }),
      });

      if (response.ok) {
        console.log('Recipe added to favorites');
      } else {
        console.error('Failed to add recipe to favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={handleAddFavorite}>Add to Favorites</button>;
};

export default FavoriteButton;
