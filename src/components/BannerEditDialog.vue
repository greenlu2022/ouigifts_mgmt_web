<script setup lang="ts">
import {reactive, ref} from 'vue'
import DateTimePickField from "./DateTimePickField.vue"
import type Banner from "@/types/Banner.ts"
import {required} from "@vuelidate/validators";
import {endDateAfterStartDate, isUrlWhenActionTypeIsNotNone} from "@/validators/formValidators.ts";
import {useVuelidate} from "@vuelidate/core";
import ImageUploader from "@/components/ImageUploader.vue";


const outerProps = defineProps<{
  banner: Banner
}>()

const emit = defineEmits<{
  (e: '@confirm', banner: Banner): void,
}>()


const dialog = ref(false)

const localFormData = reactive({
  id: outerProps.banner.id ? outerProps.banner.id : 0,
  name: outerProps.banner.name ? outerProps.banner.name : "",
  imageUrl: outerProps.banner.imageUrl ? outerProps.banner.imageUrl : "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  directUrl: outerProps.banner.directUrl ? outerProps.banner.directUrl : "",
  actionType: outerProps.banner.actionType ? outerProps.banner.actionType : "None",
  startTime: outerProps.banner.startTime ? outerProps.banner.startTime : "",
  endTime: outerProps.banner.endTime ? outerProps.banner.endTime : "",
  isEnabled: outerProps.banner.isEnabled ? outerProps.banner.isEnabled : false,
})

const rules = {
  imageUrl: {
    required,
  },
  name: {
    required
  },
  directUrl: {
    isUrlWhenActionTypeIsNotNone
  },
  actionType: {
    required
  },
  endTime: {
    endDateAfterStartDate
  }
};

const v$ = useVuelidate(rules, localFormData);

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
        Edit Banner
      </VCardTitle>
      <VRow class="pa-3">
        <VCol cols="12">
          <ImageUploader v-model="localFormData.imageUrl"></ImageUploader>
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField
              label="Name"
              variant="outlined"
              v-model="localFormData.name"
          ></VTextField>
        </VCol>
        <VCol cols="12" sm="6">
          <VSelect
              label="Action Type"
              :items="['None', 'Inner Route', 'Outer Route']"
              variant="outlined"
              v-model="localFormData.actionType"
          ></VSelect>
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField
              placeholder="https://"
              label="Direct Url"
              variant="outlined"
              v-model="localFormData.directUrl"
              :error-messages="v$.directUrl.$errors.map((e: any):string => e.$message)"
              :disabled="localFormData.actionType === 'None'"
          ></VTextField>
        </VCol>
        <VCol cols="12" sm="6">
          <DateTimePickField label="Start Date" v-model="localFormData.startTime"></DateTimePickField>
        </VCol>
        <VCol cols="12" sm="6">
          <DateTimePickField
              label="End Date"
              v-model="localFormData.endTime"
              :error-messages="v$.endTime.$errors.map((e: any):string => e.$message)"
          ></DateTimePickField>
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
            color="green-darken-1"
            @click="handleSubmit"
        >
          Save
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>

</style>