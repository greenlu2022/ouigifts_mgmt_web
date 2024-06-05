<script setup lang="ts">
import {reactive, ref} from 'vue'
import Category from "@/types/Category.ts";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import ImageUploader from "@/components/ImageUploader.vue";


const outerProps = defineProps<{
  category: Category
}>()

const emit = defineEmits<{
  (e: '@confirm', category: Category): void,
}>()

const dialog = ref(false)

const localFormData = reactive({
  id: outerProps.category.id ? outerProps.category.id : 0,
  imageUrl: outerProps.category.imageUrl ? outerProps.category.imageUrl : "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  name: outerProps.category.name ? outerProps.category.name : "",
  isEnabled: outerProps.category.isEnabled ? outerProps.category.isEnabled : false,
})
const rules = {
  imageUrl: {
    required
  },
  name: {
    required,
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
              v-model="localFormData.name"
              :error-messages="v$.name.$errors.map((e: any) => e.$message)"
              label="Name"
              required
              variant="outlined"
          ></VTextField>
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