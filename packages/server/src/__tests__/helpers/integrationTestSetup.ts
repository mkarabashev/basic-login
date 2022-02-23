import { Connection } from "typeorm"
import { config } from "../../config/config"
import { initializeDB } from "../../database"
import { Session } from "../../database/entities/Session"
import { User } from "../../database/entities/User"

const setupDB = (): void => {
    let connection: Connection

    beforeAll(async () => {
        connection = await initializeDB(config)
    })

    afterEach(async () => {
        await Promise.all([User, Session]
            .map((entity) => connection.getRepository(entity).clear()))
    })

    afterAll(async () => {
        await connection.close()
    })
}

setupDB()