const request = require('supertest');
const app = require('../app'); // נתיב לקובץ הראשי של האפליקציה שלך

describe('Search Recipes with Advanced Filters', () => {
  it('should return recipes that match the specified filters', async () => {
    const response = await request(app)
      .get('/api/recipes-with-filters/search-with-filters')
      .query({ ingredients: ['tomato'], maxPrepTime: 30, difficulty: 'easy', cuisine: 'Italian' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);

    response.body.forEach(recipe => {
      expect(recipe.prep_time).toBeLessThanOrEqual(30);
      expect(recipe.difficulty).toBe('easy');
      expect(recipe.cuisine).toBe('Italian');
    });
  });

  it('should return an empty array if no recipes match the filters', async () => {
    const response = await request(app)
      .get('/api/recipes-with-filters/search-with-filters')
      .query({ ingredients: ['nonexistentingredient'], maxPrepTime: 1, difficulty: 'impossible', cuisine: 'unknown' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
