import supertest from 'supertest';
import app from '../../app';

// List of Vaccinations
test('GET /api/vaccination', async () => {
  await supertest(app)
    .get('/api/vaccination')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('location');
      expect(response.body[0]).toHaveProperty('iso_code');
    });
});

// Vaccination with invalid location
test('GET /api/vaccination/:location', async () => {
  await supertest(app)
    .get('/api/vaccination/1')
    .expect(500)
    .then((response) => {
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
    });
});

// Vaccination with valid location ISO Code
test('GET /api/vaccination/:location', async () => {
  await supertest(app)
    .get('/api/vaccination/IND')
    .expect(500)
    .then((response) => {
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
    });
});

// Vaccination with valid location
test('GET /api/vaccination/:location', async () => {
  await supertest(app)
    .get('/api/vaccination/India')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('location');
      expect(response.body[0]).toHaveProperty('date');
    });
});
