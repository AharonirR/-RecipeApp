const request = require('supertest');
const app = require('../app'); // נתיב לקובץ הראשי של האפליקציה שלך

describe('Shopping List Feature', () => {
  it('should allow a user to add an item to their shopping list', async () => {
    const response = await request(app)
      .post('/api/shopping-list')
      .send({ userId: 1, itemName: 'Tomatoes' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('user_id', 1);
    expect(response.body).toHaveProperty('item_name', 'Tomatoes');
  });

  it('should return a user\'s shopping list', async () => {
    const response = await request(app)
      .get('/api/shopping-list')
      .query({ userId: 1 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should allow a user to update the status of an item in their shopping list', async () => {
    const response = await request(app)
      .put('/api/shopping-list/1')
      .send({ isPurchased: true });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('is_purchased', true);
  });

  it('should allow a user to remove an item from their shopping list', async () => {
    const response = await request(app)
      .delete('/api/shopping-list/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Item removed successfully');
  });
});
