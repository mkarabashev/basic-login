export const login = (): void => sessionStorage.setItem('loggedIn', 'true')
export const logout = (): void => sessionStorage.clear()
export const isLoggedIn = (): boolean => sessionStorage.getItem('loggedIn') === 'true'