import axios from 'axios'
import { login } from './session'

const apiUrl = process.env.REACT_APP_URL

if (!apiUrl) {
  throw new Error('API url unknown')
}

axios.defaults.baseURL = apiUrl

const parseError = (error: any): string => {
  if (typeof error !== 'object') return 'Unknown error'
  return error?.response?.data?.error || 'Unknown error'
}

export const getCSRFToken = async (): Promise<void> => {
  const response = await axios.get('/v1/auth/csrfToken', { data: {} })
  axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken
  axios.defaults.headers.delete['X-CSRF-Token'] = response.data.CSRFToken
}

export interface User {
  email: string
  password: string
  name: string
}

export const createUser = async (user: User): Promise<void> => {
  try {
    await axios.post('/v1/users', user)
  } catch (error) {
    throw new Error(parseError(error))
  }
}

export const getUser = async (): Promise<User> => {
  try {
    const res = await axios.get('/v1/user', { data: {} })
    return res.data
  } catch (error) {
    throw new Error(parseError(error))
  }

}

export const authenticate = async (email: string, password: string): Promise<void> => {
  try {
    await axios.post('/v1/auth/login', null, {
      headers: {
        Authorization: `Basic ${btoa(`${email}:${password}`)}`
      }
    })

    login()
  } catch (error) {
    throw new Error(parseError(error))
  }
}

export const logout = async (): Promise<void> => {
  logout()
  
  try {
    await axios.delete('v1/auth/logout', { data: {} })
  } catch (error) {
    throw new Error(parseError(error))
  }
}