import request from 'supertest';
import express from 'express';
import router from '../api/login/route.js';

const app = express();
app.use(express.json());
app.use('/', router);

describe('Login API', () => {
    test('should return 400 if email or password is missing', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: '', password: '' });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'Masukkan email dan password anda');
    });

    test('should return 401 if user not found', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'notfound@example.com', password: 'wrongpassword' });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error', 'Email atau password anda salah');
    });



    test('should return 200 and user data for valid credentials', async () => {
        // This test will only pass if the user exists in your Supabase DB with this email and password
        const res = await request(app)
            .post('/login')
            .send({ email: 'admin@gmail.com', password: 'admin#123' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).not.toHaveProperty('password');
    });
    
    test('should return 201 and user data for successful signup', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                email: 'faiz@gmail.com',
                password: 'testpassword123',
                no_telepon: '08123456789',
                username: 'Test'
            });

        expect(res.statusCode).toBe(201);
    });
});