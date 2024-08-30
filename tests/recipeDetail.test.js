const request = require('supertest');
const app = require('../app'); // נתיב לקובץ הראשי של האפליקציה שלך

describe('Recipe Detail Feature', () => {
  it('should return detailed information about a specific recipe', async () => {
    const response = await request(app)
      .get('/api/recipes/1'); // נניח שהמזהה של המתכון הוא 1

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('ingredients');
    expect(response.body).toHaveProperty('instructions');
    expect(response.body).toHaveProperty('prep_time');
    expect(response.body).toHaveProperty('difficulty');
    expect(response.body).toHaveProperty('cuisine');
  });

  it('should return a 404 error if the recipe is not found', async () => {
    const response = await request(app)
      .get('/api/recipes/9999'); // מזהה מתכון שאינו קיים

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Recipe not found');
  });
});
