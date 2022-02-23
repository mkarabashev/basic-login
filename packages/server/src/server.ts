import bodyParser from 'body-parser'
import express, { Express } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { Config, NodeEnv } from './config/config'
import { authRoutes } from './resources/auth/route'
import { userRoutes } from './resources/users/route'
import { createExpressSession, createCsrfProtection } from './middlewares/auth'
import passport from 'passport'
import morgan from 'morgan'
import { createErrorHandler as errorHandler } from './middlewares/errorHandler'

export const createApp = (config: Config): Express => {
    const app = express()

    app.use(helmet())
    app.use(morgan('tiny'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(createExpressSession(config))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(createCsrfProtection(config))

    app.use(userRoutes)
    app.use(authRoutes)

    app.use(errorHandler)

    const port = config.server.port
    
    if (config.nodeEnv !== NodeEnv.test) {
        app.listen(port, () => {
            console.log( `server started at http://localhost:${ port }` )
        })
    }

    return app
}

