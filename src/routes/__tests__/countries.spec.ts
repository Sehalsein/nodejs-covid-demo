import supertest from 'supertest';
import app from '../../app';

// List of Countries
test('GET /api/country', async () => {
  await supertest(app)
    .get('/api/country')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('location');
      expect(response.body[0]).toHaveProperty('iso_code');
    });
});

// Country Detail with Invalid ISO Code
test('GET /api/country/:id', async () => {
  await supertest(app)
    .get('/api/country/1')
    .expect(500)
    .then((response) => {
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
    });
});

// Country Detail with Valid ISO Code
test('GET /api/country/:id', async () => {
  await supertest(app)
    .get('/api/country/IND')
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveProperty('iso_code');
      expect(response.body).toHaveProperty('location');
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });
});

// Country Compare with with no Code
test('GET /api/country/compare', async () => {
  await supertest(app)
    .get('/api/country/compare')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(0);
    });
});

// Country Compare with with empty Code
test('GET /api/country/compare', async () => {
  await supertest(app)
    .get('/api/country/compare?code=')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(0);
    });
});

// Country Compare with with empty Code
test('GET /api/country/compare', async () => {
  await supertest(app)
    .get('/api/country/compare?code=IND')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeLessThanOrEqual(1);
    });
});
