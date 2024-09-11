import SubCoupon from "@/types/SubCoupon.ts";
import type {ID} from "@/types/utilsType.ts";

export default interface Account {
    id?: ID,
    imageUrl: string,
    accountId: string,
    name: string,
    password: string,
    email: string,
    phone: string,
    nationality: string,
    birthday: string,
    membership: string,
    memberPoints: number,
    collections: SubCoupon[],
    status: string,
    lastLoginTime: string,
    sessionToken: string,
    isPhoneVerified: boolean,
    isEnabled: boolean,
}
