import { getConnection } from 'typeorm'
import { NotFoundError, ValidationError } from '../../middlewares/errorHandler'
import { User } from '../entities/User'

const add = async (user: Omit<User, 'id'>): Promise<User> => {
    return getConnection('app').transaction(async (entityManager) => {

        const repository = entityManager.getRepository(User)

        const existingUser = await repository.findOne({ email: user.email })
        if (existingUser) {
            throw new ValidationError(`User with email ${user.email} already exists`)
        }

        return repository.save(user)
    })
}

const findById = async (id: string): Promise<User> => {
    const repository = getConnection('app').getRepository(User)
    const user = await repository.findOne({ id })

    if (!user) {
        throw new NotFoundError('User not found')
    }

    return user
}

const findByEmail = async (email: string): Promise<User> => {
    const repository = getConnection('app').getRepository(User)
    const user = await repository.findOne({ email })

    if (!user) {
        throw new NotFoundError(`User with email ${email} not found`)
    }

    return user
}

export const userRepository = {
    add,
    findById,
    findByEmail,
}