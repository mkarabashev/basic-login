import { config } from './config/config'
import { initializeDB } from './database'
import { createApp } from './server'

process.on('uncaughtException', (err) => {
    console.error(err.message)
    process.exit(1)
})

const start = async () => {
    try {
        await initializeDB(config)
        createApp(config)
    } catch (e) {
        console.error(`Failed to start the app server: ${e?.message}`)
    }
}

start()