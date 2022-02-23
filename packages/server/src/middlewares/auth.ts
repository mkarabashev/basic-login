import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import session from 'express-session'
import { Config, NodeEnv } from '../config/config'
import { User } from '../database/entities/User'
import { UnauthorizedError } from './errorHandler'
import { userRepository } from '../database/repositories/userRepository'
import argon2 from 'argon2'
import { RequestHandler } from 'express'
import { TypeormStore } from 'connect-typeorm'
import { getConnection } from 'typeorm'
import { Session } from '../database/entities/Session'
import csrf from 'csurf'

const oneHour = 1000 * 60 * 60

export const createExpressSession = (config: Config) => session({
    secret: config.server.secret,
    resave: false,
    store: new TypeormStore({
        cleanupLimit: 2,
        ttl: oneHour
    }).connect(getConnection('app').getRepository(Session)),
    cookie: { 
        httpOnly: true,
        maxAge: oneHour,
        sameSite: 'lax',
        secure: config.nodeEnv === NodeEnv.production,
    },
})

passport.use(new BasicStrategy(async (email, password, done) => {
    try {
        const user = await userRepository.findByEmail(email)

        const isValid = await argon2.verify(user.password, password)
        if (!isValid) {
            throw new Error()
        }

        done(null, user)
    } catch {
        done(new UnauthorizedError('Unable to authorize user credentials'), null)
    }
}))

passport.serializeUser((user: User, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await userRepository.findById(id)
        done(null, user)
    } catch {
        done(null, false)
    }
})

export const authenticate: RequestHandler = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        next(new UnauthorizedError('Unable to authorize user credentials'))
    }
}

export const createCsrfProtection = (config: Config) => csrf({
    cookie: {
        secure: config.nodeEnv === NodeEnv.production,
        httpOnly: true,
        maxAge: oneHour,
        sameSite: 'lax',
    }
})