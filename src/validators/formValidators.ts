import {helpers} from "@vuelidate/validators"

export const required = helpers.withMessage<string>("This field is required", (value: string) => helpers.req(value))

export const endDateAfterStartDate = helpers.withMessage<string>(
    "End date must be after start date",
    (value: string, vm: any): boolean => {
        if (!value) return true
        return new Date(value) > new Date(vm.startTime)
    })