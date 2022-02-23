import dotenv from 'dotenv'
import joi from 'joi'

export enum NodeEnv {
    production = 'production',
    development = 'development',
    test = 'test',
}

interface EnvVariables {
    NODE_ENV: NodeEnv
    PORT: number
    SECRET: string
    DB_NAME: string
    DB_USER: string
    DB_PASSWORD: string
    DB_PORT: number
}

dotenv.config()

const envSchema = joi
    .object<EnvVariables>()
    .keys({
        NODE_ENV: joi
            .string()
            .valid("production", "development", "test")
            .required(),
        PORT: joi.number().positive().required(),
        SECRET: joi.string().required(),
        DB_NAME: joi.string().required(),
        DB_USER: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_PORT: joi.number().positive().required(),
    })
    .unknown()

const { value: envVariables, error } = envSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env)

if (error) {
    throw new Error(`Env variables are not set correctly: ${error.message}`)
}

if (!envVariables) {
    throw new Error('Couldn\'t validate env variables')
}

export const config = {
    nodeEnv: envVariables.NODE_ENV,
    server: {
        port: envVariables.PORT,
        secret: envVariables.SECRET,
    },
    db: {
        name: envVariables.DB_NAME,
        port: envVariables.DB_PORT,
        user: envVariables.DB_USER,
        password: envVariables.DB_PASSWORD,
    }
} as const

export type Config = typeof config