import request from 'supertest';
import app from '../app.js';

describe('GET /workouts', () => {
  it('should return an array of workouts', async () => {
    const res = await request(app).get('/workouts');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});