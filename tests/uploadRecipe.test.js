const request = require('supertest');
const app = require('../app'); // נתיב לקובץ הראשי של האפליקציה שלך

describe('Upload Recipe Feature', () => {
  it('should allow a user to upload a recipe', async () => {
    const recipeData = {
      userId: 1,
      name: 'Spaghetti Carbonara',
      ingredients: ['spaghetti', 'eggs', 'bacon'],
      instructions: 'Cook spaghetti, mix eggs and bacon, and combine.',
      imageUrl: 'http://example.com/carbonara.jpg',
      prepTime: 30,
      difficulty: 'medium',
      cuisine: 'Italian'
    };

    const response = await request(app)
      .post('/api/recipes')
      .send(recipeData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'Spaghetti Carbonara');
    expect(response.body).toHaveProperty('ingredients', expect.arrayContaining(['spaghetti', 'eggs', 'bacon']));
  });
});
