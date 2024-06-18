export default interface User {
    id?: number,
    accountId: string,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    phone: string,
    sessionToken: string,
}