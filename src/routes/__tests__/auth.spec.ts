import supertest from 'supertest';
import app from '../../app';

// Login with No Credentials
test('POST /api/auth/login', async () => {
  await supertest(app)
    .post('/api/auth/login')
    .expect(500)
    .then((response) => {
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
    });
});

// Login with No Password
test('POST /api/auth/login', async () => {
  await supertest(app)
    .post('/api/auth/login')
    .send({ email: 'test@test.com' })
    .expect(500)
    .then((response) => {
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
    });
});

// Login with No Email
test('POST /api/auth/login', async () => {
  await supertest(app)
    .post('/api/auth/login')
    .send({ password: 'password' })
    .expect(500)
    .then((response) => {
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
    });
});

// Login with Nonexisting User
test('POST /api/auth/login', async () => {
  await supertest(app)
    .post('/api/auth/login')
    .send({ email: 'test@demo.com', password: 'asd' })
    .expect(500)
    .then((response) => {
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
    });
});

// Login with Invalid Password
test('POST /api/auth/login', async () => {
  await supertest(app)
    .post('/api/auth/login')
    .send({ email: 'dev@demo.com', password: 'asd' })
    .expect(500)
    .then((response) => {
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
    });
});

// Login with Invalid Password
test('POST /api/auth/login', async () => {
  await supertest(app)
    .post('/api/auth/login')
    .send({ email: 'dev@demo.com', password: 'password' })
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('token');
    });
});

// Register with Existing User
test('POST /api/auth/register', async () => {
  await supertest(app)
    .post('/api/auth/register')
    .send({ email: 'dev@demo.com', password: 'password' })
    .expect(500)
    .then((response) => {
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
    });
});

// Register with new User
test('POST /api/auth/register', async () => {
  await supertest(app)
    .post('/api/auth/register')
    // Can use a better method to generate a random email
    .send({ email: `dev${Math.random()}@demo.com`, password: 'password' })
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('result');
      expect(response.body.result).toHaveProperty('email');
    });
});
