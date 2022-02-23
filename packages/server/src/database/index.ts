import {createConnection, Connection, getConnection} from 'typeorm'
import { Config } from '../config/config'
import { Session } from './entities/Session'
import { User } from './entities/User'

export const initializeDB = async (config: Config): Promise<Connection> => {
    const connection = await createConnection({
        name: "app",
        type: "postgres",
        host: "localhost",
        port: config.db.port,
        username: config.db.user,
        password: config.db.password,
        database: config.db.name,
        entities: [
            User,
            Session,
        ],
        synchronize: true,
    })
    
    console.log('Connection to DB established')
    return connection
}