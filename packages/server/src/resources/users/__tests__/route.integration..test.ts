import request from 'supertest'
import { config } from '../../../config/config'
import { createApp } from '../../../server'
import { Express } from 'express'
import { ApiUser } from '../service'



describe('User Routes', () => {
    let app: Express

    let csrfCookie: string
    let csrfToken: string

    beforeAll(() => {
        app = createApp(config)
    })

    beforeEach(async () => {
        const res = await request(app).get('/v1/auth/csrfToken').accept('json')
        csrfCookie = res.headers['set-cookie'].find((str: string) => /_csrf/.test(str))
        csrfToken = res.body.CSRFToken
    })

    afterAll(() => {
        app.removeAllListeners()
    })

    describe('POST /v1/users', () => {
        it('should create a new user', async () => {
            const user: ApiUser = {
                name: 'John Smith',
                email: 'john@email.com',
                password: 'Password123'
            }

            await request(app)
                .post('/v1/users')
                .set('x-csrf-token', csrfToken)
                .set('cookie', csrfCookie)
                .send(user)
                .accept('json')
                .expect(201)             
        })

        it('should require a csrf token', async () => {
            await request(app)
                .post('/v1/users')
                .send({})
                .accept('json')
                .expect(403)            
        })

        it('should require validation', async () => {
            await request(app)
                .post('/v1/users')
                .set('x-csrf-token', csrfToken)
                .set('cookie', csrfCookie)
                .send({})
                .accept('json')
                .expect(400)    
        })
    })

    describe('GET /v1/user', () => {
        it('should require an active session', async () => {
            await request(app)
                .get('/v1/user')
                .accept('json')
                .expect(401) 
        })

        it('should return the user for the session', async () => {
            const user: ApiUser = {
                name: 'John Smith',
                email: 'john@email.com',
                password: 'Password123'
            }

            await request(app)
                .post('/v1/users')
                .set('x-csrf-token', csrfToken)
                .set('cookie', csrfCookie)
                .send(user)
                .accept('json')
                .expect(201)
                
            const res = await request(app)
                .post('/v1/auth/login')
                .set('x-csrf-token', csrfToken)
                .set('cookie', csrfCookie)
                .auth(user.email, user.password, { type: 'basic' })
                .accept('json')
                .expect(201)
                
                await request(app)
                .get('/v1/user')
                .set('Cookie', res.headers['set-cookie'])
                .accept('json')
                .expect(200) 
        })
    })
})