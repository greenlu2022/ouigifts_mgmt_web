import {helpers} from "@vuelidate/validators"

const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export const required = helpers.withMessage<string>("This field is required", (value: string) => helpers.req(value))

export const endDateAfterStartDate = helpers.withMessage<string>(
    "End date must be after start date",
    (value: string, vm: any): boolean => {
        if (!value) return true
        return new Date(value) > new Date(vm.startTime)
    })

export const isUrlWhenActionTypeIsNotNone = helpers.withMessage<string>(
    "This field must be a valid URL",
    (value: string, vm: any): boolean => {
        return vm.actionType.toLowerCase() === "none" || (helpers.req(value) && urlPattern.test(value))
    }
)