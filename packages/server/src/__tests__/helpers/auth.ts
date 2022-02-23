const encode = (str: string): string => Buffer.from(str).toString('base64')

export const createAuthHeader = (username: string, password: string): string =>
    `Basic ${encode(`${username}:${password}`)}`