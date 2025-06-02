import handler from '../app/api/profile/route.js';
import { supabase } from '../lib/client.js';

function mockReqRes(method, body = {}) {
  const req = { method, body };
  let statusCode, jsonData;
  const res = {
    status: jest.fn((code) => {
      statusCode = code;
      return res;
    }),
    json: jest.fn((data) => {
      jsonData = data;
      return res;
    }),
  };
  return { req, res, get statusCode() { return statusCode; }, get jsonData() { return jsonData; } };
}

describe('Profile Edit API integration (id_pengguna=1)', () => {
  it('should update user with id_pengguna=1', async () => {
    const newData = {
      id_pengguna: 1,
      email: 'another@mail.com',
      password: 'newpass1',
      no_telepon: '081234567890',
      username: 'updateduser1'
    };
    const { req, res } = mockReqRes('PUT', newData);
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});