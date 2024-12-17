import type {ID} from "@/types/utilsType.ts";

export default interface User {
    id?: ID,
    accountId: string,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    phone: string,
    sessionToken: string,
}