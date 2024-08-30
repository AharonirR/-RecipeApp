const request = require('supertest');
const app = require('../app'); // נתיב לקובץ הראשי של האפליקציה שלך

describe('Favorites Feature', () => {
  it('should allow a user to add a recipe to favorites', async () => {
    const response = await request(app)
      .post('/api/favorites')
      .send({ userId: 1, recipeId: 1 });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('user_id', 1);
    expect(response.body).toHaveProperty('recipe_id', 1);
  });

  it('should return a user\'s favorite recipes', async () => {
    const response = await request(app)
      .get('/api/favorites')
      .query({ userId: 1 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should allow a user to remove a recipe from favorites', async () => {
    const response = await request(app)
      .delete('/api/favorites/1')
      .query({ userId: 1 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Favorite removed successfully');
  });
});
