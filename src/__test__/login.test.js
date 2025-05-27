import handler from '../api/login/route.js';

describe('Login API', () => {
    // Helper to mock req and res
    function createMocks({ method = 'POST', body = {} } = {}) {
        let statusCode = 0;
        let jsonResponse = null;
        const req = { method, body };
        const res = {
            status: (code) => {
                statusCode = code;
                return res;
            },
            json: (data) => {
                jsonResponse = data;
                return res;
            }
        };
        return { req, res, getStatus: () => statusCode, getJson: () => jsonResponse };
    }

    test('should return 401 for invalid credentials', async () => {
        const { req, res, getStatus, getJson } = createMocks({
            body: {
                email: 'notfound@example.com',
                password: 'wrongpassword',
                type: 'login'
            }
        });

        await handler(req, res);

        expect(getStatus()).toBe(401);
        expect(getJson()).toHaveProperty('error');
    });

    test('should return 400 for invalid request type', async () => {
        const { req, res, getStatus, getJson } = createMocks({
            body: {
                email: 'admin@gmail.com',
                password: 'admin#123',
                type: 'invalid'
            }
        });

        await handler(req, res);

        expect(getStatus()).toBe(400);
        expect(getJson()).toHaveProperty('error');
    });

    test('should return 405 for non-POST requests', async () => {
        const { req, res, getStatus, getJson } = createMocks({
            method: 'GET'
        });

        await handler(req, res);

        expect(getStatus()).toBe(405);
        expect(getJson()).toHaveProperty('error');
    });

    // NOTE: The following test will only pass if the credentials exist in Supabase Auth
    // and the test environment is properly configured with Supabase keys.
    // Uncomment and adjust as needed.
    /*
    test('should return 200 for valid credentials', async () => {
        const { req, res, getStatus, getJson } = createMocks({
            body: {
                email: 'admin@gmail.com',
                password: 'admin#123',
                type: 'login'
            }
        });

        await handler(req, res);

        expect(getStatus()).toBe(200);
        expect(getJson()).toHaveProperty('user');
    });
    */
});