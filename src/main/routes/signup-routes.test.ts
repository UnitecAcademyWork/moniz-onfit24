import request from 'supertest'
import app from '../config/app'

describe('SignUp Route', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'lambo',
        email: 'lambo@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
