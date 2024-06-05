<script setup lang="ts">
import {reactive, ref} from "vue";
import DateTimePickField from "@/components/DateTimePickField.vue";
import CouponType from "@/types/CouponType.ts";
import {useCategoryStore} from "@/stores/category";
import {required} from "@vuelidate/validators";
import {endDateAfterStartDate} from "@/validators/formValidators.ts";
import {useVuelidate} from "@vuelidate/core";
import ImageUploader from "@/components/ImageUploader.vue";


const categoryStore = useCategoryStore()
const categories = categoryStore.categories.map(item => {
  return {title: item.name, value: item.id}
})

const initialData = {
  imageUrl: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  name: "",
  code: "",
  categoryIds: [],
  startTime: "",
  endTime: "",
  isLimited: false,
  availableAmount: 0,
  isEnabled: false,
}


const dialog = ref<boolean>(false)
const localFormData = reactive({...initialData})

const rules = {
  imageUrl: {
    required,
  },
  name: {
    required
  },
  code: {
    required
  },
  categoryIds: {
    required
  },
  endTime: {
    endDateAfterStartDate
  }
};

const v$ = useVuelidate(rules, localFormData);


const emit = defineEmits<{
  (e: '@confirm', couponType: CouponType): void,
}>()

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    emit("@confirm", {...localFormData});
    dialog.value = false;
    Object.assign(localFormData, {...initialData})
    v$.value.$reset();
  } else {
    return
  }
};

const handleDismiss = () => {
  dialog.value = false;
  Object.assign(localFormData, {...initialData})
  v$.value.$reset();
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
      <VForm validate-on="submit lazy" @submit.prevent>
        <VRow class="pa-3">
          <VCol cols="12">
            <ImageUploader v-model="localFormData.imageUrl"></ImageUploader>
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
                :error-messages="v$.code.$errors.map((e: any) => e.$message)"
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
                v-model="localFormData.categoryIds"
                :error-messages="v$.categoryIds.$errors.map((e: any) => e.$message)"
                required
            ></v-select>
          </VCol>
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