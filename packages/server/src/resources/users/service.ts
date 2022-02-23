import { User } from '../../database/entities/User'
import { userRepository } from '../../database/repositories/userRepository'
import argon2 from 'argon2'

export type ApiUser = Omit<User, 'id'>

export const addUser = async (user: ApiUser): Promise<void> => {
    const hashedPassword = await argon2.hash(user.password)
    await userRepository.add({ ...user, password: hashedPassword })
}