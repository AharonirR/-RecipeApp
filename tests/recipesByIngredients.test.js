const request = require('supertest');
const app = require('../app'); // נתיב לקובץ הראשי של האפליקציה שלך

describe('Search Recipes by Ingredients', () => {
  it('should return recipes that contain the specified ingredients', async () => {
    const response = await request(app)
      .get('/api/recipes-by-ingredients/search-by-ingredients')
      .query({ ingredients: ['tomato', 'cheese'] });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);

    response.body.forEach(recipe => {
      expect(recipe.ingredients).toEqual(
        expect.arrayContaining(['tomato', 'cheese'])
      );
    });
  });

  it('should return an empty array if no recipes match the ingredients', async () => {
    const response = await request(app)
      .get('/api/recipes-by-ingredients/search-by-ingredients')
      .query({ ingredients: ['nonexistentingredient'] });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
