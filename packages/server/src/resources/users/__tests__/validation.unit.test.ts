import { ApiUser } from "../service"
import { userSchema } from "../validation"

describe('User Validation', () => {
    let user: ApiUser

    beforeEach(() => {
        user = {
            name: 'John Smith',
            email: 'john@email.com',
            password: 'Password123'
        }            
    })

    it('should require an email', () => {
        const { email, ...wrongUser } = user
        const { error } = userSchema.validate(wrongUser)
        expect(error).toBeTruthy()
    })

    it('should require a name', () => {
        const { name, ...wrongUser } = user
        const { error } = userSchema.validate(wrongUser)
        expect(error).toBeTruthy()
    })
  
    it('should require a name of at least 5 characters', () => {
        user.name = ''
        const { error } = userSchema.validate(user)
        expect(error).toBeTruthy()
    })
  
    it('should require a password', () => {
        const { password, ...wrongUser } = user
        const { error } = userSchema.validate(wrongUser)
        expect(error).toBeTruthy()
    })
  
    it('should require a password of at least 8 characters', () => {
        user.password = ''
        const { error } = userSchema.validate(user)
        expect(error).toBeTruthy()
    })
 
    it('should require a password of no more than 20 characters', () => {
        user.password = 'a'.repeat(21)
        const { error } = userSchema.validate(user)
        expect(error).toBeTruthy()
    })
 
    it('should require a password with at least one number', () => {
        user.password = 'a'.repeat(8)
        const { error } = userSchema.validate(user)
        expect(error).toBeTruthy()
    })
 
    it('should require a password with at least one capital leter', () => {
        user.password = 'password123'
        const { error } = userSchema.validate(user)
        expect(error).toBeTruthy()
    })
 
    it('should validate the correct user payload', () => {
        const { error } = userSchema.validate(user)
        expect(error).toBeFalsy()
    })
 
})