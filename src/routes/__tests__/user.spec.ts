import supertest from 'supertest';
import app from '../../app';

// Get User Profile
test('POST /api/user/profile', async () => {
  await supertest(app).post('/api/user/profile').expect(401);
});
