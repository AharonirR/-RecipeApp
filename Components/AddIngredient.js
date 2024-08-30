import React, { useState } from 'react';

const AddIngredient = ({ userId }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleAddIngredient = async (e) => {
    e.preventDefault();

    const ingredientData = {
      name,
      userId
    };

    try {
      const response = await fetch('/api/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredientData),
      });

      if (response.ok) {
        setMessage('Ingredient added successfully!');
        setName(''); // Reset the input field
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to add ingredient.');
      }
    } catch (error) {
      console.error('Error adding ingredient:', error);
      setMessage('Error adding ingredient.');
    }
  };

  return (
    <form onSubmit={handleAddIngredient}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ingredient Name"
        required
      />
      <button type="submit">Add Ingredient</button>
      <p>{message}</p>
    </form>
  );
};

export default AddIngredient;
