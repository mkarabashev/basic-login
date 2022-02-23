import { userRepository } from "../../../database/repositories/userRepository"
import { ValidationError } from "../../../middlewares/errorHandler"
import { addUser, ApiUser } from "../service"

describe('User Service', () => {
    let user: ApiUser

    beforeEach(() => {
        user = {
            name: 'John Smith',
            email: 'john@email.com',
            password: 'Password123'
        }    
    })
    it('should add a user', async () => {
        await addUser(user)
        const savedUser = userRepository.findByEmail(user.email)
        expect(user).toMatchObject(savedUser)
    })

    it('should not add a user if the user already exists', async () => {
        await addUser(user)
        await expect(addUser(user)).rejects.toThrow(ValidationError)
    })
})