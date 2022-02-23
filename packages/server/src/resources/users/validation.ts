import joi from 'joi'

export const userSchema = joi
    .object()
    .keys({
        email: joi.string().email().required(),
        name: joi.string().min(5).required(),
        password: joi.string().min(8).max(20).pattern(/[0-9]+/).pattern(/[A-Z]+/).required()
    })