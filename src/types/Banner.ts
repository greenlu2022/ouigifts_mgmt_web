import type {ID} from "@/types/utilsType.ts";

export default interface Banner {
    id?: ID,
    name: string,
    imageUrl: string,
    directUrl: string,
    actionType: string
    startTime: string,
    endTime: string,
    isEnabled: boolean,
}

