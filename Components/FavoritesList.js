import React, { useEffect, useState } from 'react';

const FavoritesList = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/favorites?userId=${userId}`);
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleRemoveFavorite = async (recipeId) => {
    try {
      const response = await fetch(`/api/favorites/${recipeId}?userId=${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFavorites(favorites.filter((recipe) => recipe.id !== recipeId));
      } else {
        console.error('Failed to remove favorite');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Your Favorite Recipes</h2>
      {favorites.length > 0 ? (
        favorites.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <button onClick={() => handleRemoveFavorite(recipe.id)}>Remove from Favorites</button>
          </div>
        ))
      ) : (
        <p>No favorite recipes found.</p>
      )}
    </div>
  );
};

export default FavoritesList;
