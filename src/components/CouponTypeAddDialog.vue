<script setup lang="ts">
import {computed, ref, watch} from "vue";
import DateTimePickField from "@/components/DateTimePickField.vue";
import CouponType from "@/types/CouponType.ts";
import {useCategoryStore} from "@/stores/category";

const categoryStore = useCategoryStore()
const categories = categoryStore.categories.map(item => {
  return {title: item.name, value: item.id}
})


const dialog = ref<boolean>(false)
const valid = ref<boolean>(false)

const errorMessage = ref<string>("")
const refInputEl = ref<HTMLElement>()
const dataLocal = ref<CouponType>({
  imageUrl: "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
})

watch(dialog, () => {
  errorMessage.value = ""
})

const hasEmptyValue = computed(() => {
  return dataLocal.value.name == null || dataLocal.value.code == null || dataLocal.value.categoryIds?.length == 0
})

watch(hasEmptyValue, (newValue) => {
  if (!newValue) {
    errorMessage.value = ""
  }

})

const emit = defineEmits<{
  (e: '@confirm', couponType: CouponType): void,
}>()

const handleConfirm = () => {
  if (hasEmptyValue.value) {
    console.log('hasEmptyValue', hasEmptyValue)
    errorMessage.value = "Required field can't be empty"
  } else {
    emit("@confirm", dataLocal.value)
    dialog.value = false
    dataLocal.value = {}
    dataLocal.value.imageUrl = "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
    errorMessage.value = ""
  }

}

// changeAvatar function
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
      <VBtn icon
            color="green"
            class="position-fixed"
            style="bottom:30px; right:30px"
            v-bind="props">
        <VIcon color="white">mdi-plus</VIcon>
      </VBtn>
    </template>
    <VCard class="pa-3">
      <VCardTitle class="text-h5">
        Add Main Coupon Type
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
                :rules="[() => !!dataLocal.name || 'This field is required']"
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