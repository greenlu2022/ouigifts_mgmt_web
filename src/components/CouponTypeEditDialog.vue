<script setup lang="ts">
import {ref} from 'vue'
import CouponType from "@/types/CouponType.ts";
import DateTimePickField from "@/components/DateTimePickField.vue";
import {useCategoryStore} from "@/stores/category.ts";

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

const dialog = ref(false)
const valid = ref<boolean>(false)
const refInputEl = ref<HTMLElement>()
const errorMessage = ref<string>("")

const dataLocal = ref<CouponType>({...outerProps.couponType})

const handleConfirm = () => {
  emit("@confirm", dataLocal.value)
  dialog.value = false
}

const changeAvatar = (file: Event) => {
  const fileReader = new FileReader()
  const {files} = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        dataLocal.value.imageUrl = fileReader.result
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
      <VForm v-model="valid" validate-on="submit lazy" @submit.prevent>
        <VRow class="pa-3">
          <VCol cols="12" sm="3" class="px-3">
            <VAvatar
                rounded="lg"
                size="120"
                :image="dataLocal.imageUrl"
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
                v-model="dataLocal.name"
                required
            ></VTextField>
          </VCol>
          <VCol cols="12" sm="6">
            <VTextField
                ref="code"
                label="Code*"
                variant="outlined"
                v-model="dataLocal.code"
                :rules="[() => !!dataLocal.code || 'This field is required']"
                required
            ></VTextField>
          </VCol>
          <VCol cols="12">
            <v-select
                label="Category(s)*"
                :items="categories"
                variant="outlined"
                multiple
                chips
                v-model="dataLocal.categoryIds"
                :rules="[() => !!dataLocal.categoryIds?.length || 'This field is required']"
                required
            ></v-select>
          </VCol>

          <!-- <VCol cols="12" sm="6">

          </VCol> -->

          <VCol cols="12" sm="6">
            <DateTimePickField label="Start Date" v-model="dataLocal.startTime"></DateTimePickField>
          </VCol>
          <VCol cols="12" sm="6">
            <DateTimePickField label="End Date" v-model="dataLocal.endTime"></DateTimePickField>
          </VCol>
          <VCol cols="12" sm="6">
            <VCheckbox v-model="dataLocal.isLimited" label="Limited"></VCheckbox>
          </VCol>
          <VCol cols="12" sm="6">
            <VTextField
                label="Available Amount"
                variant="outlined"
                v-model="dataLocal.availableAmount"
                single-line
                type="number"
                :disabled="!dataLocal.isLimited"
                :required="dataLocal.isLimited"
            ></VTextField>
          </VCol>

          <VCol cols="12" sm="6">
            <VSwitch class="w-50" v-model="dataLocal.isEnabled"
                     :label="dataLocal.isEnabled? 'Activated': 'Disabled'"></VSwitch>
          </VCol>

          <VCol cols="12" v-if="errorMessage.length>0">
            <div class="text-red text-center">{{ errorMessage }}</div>
          </VCol>
        </VRow>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn
              color="red"
              variant="text"
              @click="dialog = false"
          >
            Dismiss
          </VBtn>
          <VBtn
              type="submit"
              color="green-darken-1"
              @click="handleConfirm"
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