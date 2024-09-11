import type {ID} from "@/types/utilsType.ts";

export default interface Category {
    id?: ID,
    name?: string,
    imageUrl?: string,
    isEnabled?: boolean,
}