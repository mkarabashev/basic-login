import express from 'express'
import passport from 'passport'
import { User } from '../../database/entities/User'
import { authenticate } from '../../middlewares/auth'

export const authRoutes = express.Router()

authRoutes.post('/v1/auth/login/', 
    passport.authenticate('basic', { session: true }), 
    (req, res, next) => { 
        try {
            res.status(201).end()
        } catch(e) {
            next(e)
        }
    }
)

authRoutes.delete(
    '/v1/auth/logout/', 
    authenticate,
    (req, res, next) => {
        try {
            req.logOut()
            req.session.destroy(_ => 
                res.status(204).clearCookie('connect.sid').end())
        } catch (e) {
            next(e)
        }

    }
)

authRoutes.get('/v1/auth/csrfToken', (req, res, next) => {
    try {
        res.json({ CSRFToken: req.csrfToken() }).end()
    } catch (e) {
        next(e)
    }
})