const request = require('supertest');
const app = require('../app'); // נתיב לקובץ הראשי של האפליקציה שלך

describe('Add Ingredient Feature', () => {
  it('should allow a user to add a new ingredient', async () => {
    const response = await request(app)
      .post('/api/ingredients')
      .send({ name: 'Basil', userId: 1 });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'Basil');
    expect(response.body).toHaveProperty('created_by', 1);
  });

  it('should return an error if the ingredient already exists', async () => {
    await request(app)
      .post('/api/ingredients')
      .send({ name: 'Basil', userId: 1 });

    const response = await request(app)
      .post('/api/ingredients')
      .send({ name: 'Basil', userId: 1 });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'Ingredient already exists');
  });
});
