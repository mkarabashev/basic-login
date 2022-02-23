import express from 'express'
import { User } from '../../database/entities/User'
import { authenticate } from '../../middlewares/auth'
import { validateReqBody } from '../../middlewares/validate'
import { addUser } from './service'
import { userSchema } from './validation'

export const userRoutes = express.Router()

userRoutes.post(
    '/v1/users',
    validateReqBody(userSchema),
    async (req, res, next) => {
        try {
            await addUser(req.body)
            res.status(201).end()
        } catch (e) {
            next(e)
        }
    }
)

userRoutes.get(
    '/v1/user/',
    authenticate,
    async (req, res, next) => {
        try {
            const user = req.user as User
            res.status(200).json({
                email: user.email,
                name: user.name
            }).end()
        } catch (e) {
            next(e)
        }
    }
)