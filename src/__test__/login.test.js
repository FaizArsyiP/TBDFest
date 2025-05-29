import request from 'supertest';
import express from 'express';
import router from '../app/api/login/route.js';

const app = express();
app.use(express.json());
app.use('/', router);

describe('Login API', () => {
    test('should return 400 if email or password is missing', async () => {
        const res = await request(app)
            .post('/login')
            .send({ identifier: '', password: '' });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'Masukkan email/username dan password anda');
    });

    test('should return 401 if user not found', async () => {
        const res = await request(app)
            .post('/login')
            .send({ identifier: 'notfound@example.com', password: 'wrongpassword' });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error', 'Email/Username atau password anda salah');
    });



    test('should return 200 and user data for valid credentials', async () => {
        const res = await request(app)
            .post('/login')
            .send({ identifier: 'iyakah', password: 'testpassword13' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('user');
    });
    
        test('should return 201 and user data for successful signup', async () => {
            const res = await request(app)
                .post('/signup')
                .send({
                    email: 'testlag@gmail.com',
                    password: 'testpassword13',
                    no_telepon: '08123456789',
                    username: 'iyakah'
                });
            
            expect(res.statusCode).toBe(201);
        });

    });
