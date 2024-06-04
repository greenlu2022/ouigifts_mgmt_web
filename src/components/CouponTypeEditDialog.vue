<script setup lang="ts">
import {reactive, ref} from 'vue'
import CouponType from "@/types/CouponType.ts";
import DateTimePickField from "@/components/DateTimePickField.vue";
import {useCategoryStore} from "@/stores/category.ts";
import {required, url} from "@vuelidate/validators";
import {endDateAfterStartDate} from "@/validators/formValidators.ts";
import {useVuelidate} from "@vuelidate/core";

const categoryStore = useCategoryStore()
const categories = categoryStore.categories.map(item => {
  return {title: item.name, value: item.id}
})

const outerProps = defineProps<{
  couponType: CouponType
}>()

const emit = defineEmits<{
  (e: '@confirm', couponType: CouponType): void,
}>()

const localFormData = reactive<CouponType>({
  id: outerProps.couponType.id ? outerProps.couponType.id : 0,
  imageUrl: outerProps.couponType.imageUrl ? outerProps.couponType.imageUrl : "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  name: outerProps.couponType.name ? outerProps.couponType.name : "",
  code: outerProps.couponType.code ? outerProps.couponType.code : "",
  categoryIds: outerProps.couponType.categoryIds ? outerProps.couponType.categoryIds : [],
  startTime: outerProps.couponType.startTime ? outerProps.couponType.startTime : "",
  endTime: outerProps.couponType.endTime ? outerProps.couponType.endTime : "",
  isLimited: outerProps.couponType.isLimited ? outerProps.couponType.isLimited : false,
  availableAmount: outerProps.couponType.availableAmount ? outerProps.couponType.availableAmount : 0,
  isEnabled: outerProps.couponType.isEnabled ? outerProps.couponType.isEnabled : false,
})

const dialog = ref(false)
const refInputEl = ref<HTMLElement>()

const rules = {
  imageUrl: {
    required,
    url
  },
  name: {
    required
  },
  categoryIds: {
    required
  },
  endTime: {
    endDateAfterStartDate
  }
};

const v$ = useVuelidate<CouponType>(rules, localFormData);

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    emit("@confirm", {...localFormData});
    dialog.value = false;
    v$.value.$reset();
  } else {
    return
  }
};

const handleDismiss = () => {
  dialog.value = false;
  v$.value.$reset();
}


const changeAvatar = (file: Event) => {
  const fileReader = new FileReader()
  const {files} = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        Object.assign(localFormData, {imageUrl: fileReader.result})
      }
    }
  }
}
</script>

<template>
  <VDialog
      v-model="dialog"
      persistent
      width="600"
  >
    <template v-slot:activator="{ props }">
      <div v-bind="props" class="w-100">
        <VIcon color="white">mdi-pencil</VIcon>
        <span class="px-3">Edit</span>
      </div>
    </template>
    <VCard class="pa-3">
      <VCardTitle class="text-h5">
        Edit Main Coupon Type
      </VCardTitle>
      <VForm validate-on="submit lazy" @submit.prevent>
        <VRow class="pa-3">
          <VCol cols="12" sm="3" class="px-3">
            <VAvatar
                rounded="lg"
                size="120"
                :image="localFormData.imageUrl"
            />
          </VCol>
          <VCol cols="12" sm="9" class="px-3">
            <VBtn
                color="primary"
                @click="refInputEl?.click()"
            >
              <span class="d-none d-sm-block">Upload Image</span>
            </VBtn>
            <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF,.webp,.svg"
                hidden
                @input="changeAvatar"
            >
            <VSpacer></VSpacer>
            <div class="text-body-1 mt-3">
              Allowed JPG, GIF, PNG, SVG or WEBP . Max size of 800K
            </div>
          </VCol>
          <VCol cols="12" sm="6">
            <VTextField
                ref="name"
                label="Name*"
                variant="outlined"
                v-model="localFormData.name"
                :error-messages="v$.name.$errors.map((e: any) => e.$message)"
                required
            ></VTextField>
          </VCol>
          <VCol cols="12" sm="6">
            <VTextField
                ref="code"
                label="Code*"
                variant="outlined"
                v-model="localFormData.code"
                disabled
            ></VTextField>
          </VCol>
          <VCol cols="12">
            <v-select
                label="Category(s)*"
                :items="categories"
                variant="outlined"
                multiple
                chips
                v-model="localFormData.categoryIds"
                :error-messages="v$.categoryIds.$errors.map((e: any) => e.$message)"
                required
            ></v-select>
          </VCol>

          <!-- <VCol cols="12" sm="6">

          </VCol> -->

          <VCol cols="12" sm="6">
            <DateTimePickField
                label="Start Date"
                v-model="localFormData.startTime"></DateTimePickField>
          </VCol>
          <VCol cols="12" sm="6">
            <DateTimePickField
                label="End Date"
                v-model="localFormData.endTime"
                :error-messages="v$.endTime.$errors.map((e: any) => e.$message)"
            ></DateTimePickField>
          </VCol>
          <VCol cols="12" sm="6">
            <VCheckbox v-model="localFormData.isLimited" label="Limited"></VCheckbox>
          </VCol>
          <VCol cols="12" sm="6">
            <VTextField
                label="Available Amount"
                variant="outlined"
                v-model="localFormData.availableAmount"
                single-line
                type="number"
                :disabled="!localFormData.isLimited"
                :required="localFormData.isLimited"
            ></VTextField>
          </VCol>

          <VCol cols="12" sm="6">
            <VSwitch class="w-50" v-model="localFormData.isEnabled"
                     :label="localFormData.isEnabled? 'Activated': 'Disabled'"></VSwitch>
          </VCol>
        </VRow>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn
              color="red"
              variant="text"
              @click="handleDismiss"
          >
            Dismiss
          </VBtn>
          <VBtn
              type="submit"
              color="green-darken-1"
              @click="handleSubmit"
          >
            Save
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
</template>

<style scoped>

</style>