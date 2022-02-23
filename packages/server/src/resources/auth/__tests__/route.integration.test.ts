import request from 'supertest'
import { config } from '../../../config/config'
import { createApp } from '../../../server'
import { Express } from 'express'
import { userRepository } from '../../../database/repositories/userRepository'
import { hash } from 'argon2'

describe('Auth Routes', () => {
    let app: Express

    let csrfCookie: string
    let csrfToken: string

    let password: string
    let email: string

    beforeAll(() => {
        app = createApp(config)
    })

    beforeEach(async () => {
        const res = await request(app).get('/v1/auth/csrfToken').accept('json')
        csrfCookie = res.headers['set-cookie'].find((str: string) => /_csrf/.test(str))
        csrfToken = res.body.CSRFToken

        email = 'user1@mail.com'
        password = 'Password123'

        await userRepository.add({
            name: 'User Name',
            email,
            password: await hash(password),
        })
    })

    afterAll(() => {
        app.removeAllListeners()
    })

    describe('POST /v1/auth/login', () => {
        it('should require authentication', async () => {
            await request(app)
                .post('/v1/auth/login')
                .set('x-csrf-token', csrfToken)
                .set('cookie', csrfCookie)
                .accept('json')
                .expect(401)
            
        })

        it('should require a csrf token', async () => {
            await request(app)
                .post('/v1/auth/login')
                .auth(email, password, { type: 'basic' })
                .accept('json')
                .expect(403)
        })

        it('should send a session cookie when authenticated', async () => {
            const res = await request(app)
                .post('/v1/auth/login')
                .set('x-csrf-token', csrfToken)
                .set('cookie', csrfCookie)
                .auth(email, password, { type: 'basic' })
                .accept('json')
                .expect(201)

            expect(res.headers['set-cookie'].find((str: string) => /connect.sid/.test(str))).toBeTruthy()
        })
    })

    describe('DELETE /v1/auth/logout', () => {
        let sessionCookie: string

        beforeEach(async () => {
            const res = await request(app)
                .post('/v1/auth/login')
                .set('x-csrf-token', csrfToken)
                .set('cookie', csrfCookie)
                .auth(email, password, { type: 'basic' })
                .accept('json')
                .expect(201)

            sessionCookie = res.headers['set-cookie'].find((str: string) => /connect.sid/.test(str))
        })
        
        it('should require a session cookie', async () => {
            await request(app)
                .post('/v1/auth/login')
                .set('x-csrf-token', csrfToken)
                .set('cookie', csrfCookie)
                .accept('json')
                .expect(401)
        })

        it('should require a csrf token', async () => {
            await request(app)
                .post('/v1/auth/login')
                .set('cookie', sessionCookie)
                .accept('json')
                .expect(403)
        })
    })
})