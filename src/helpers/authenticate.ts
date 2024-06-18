const isLoginAuthenticated = () => {
    // Check if token is valid with your backend, this is just a simple example
    // token should have an expiration date
    return localStorage.getItem('token') !== null;
}

const clearToken = () => {
    //api call to logout, clear cookies, etc
    localStorage.removeItem('token');
}

const setToken = (token: string) => {
    //api call to login, set cookies, etc
    localStorage.setItem('token', token)
}

export {isLoginAuthenticated, clearToken, setToken}