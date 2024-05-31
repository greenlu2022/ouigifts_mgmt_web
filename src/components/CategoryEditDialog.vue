<script setup lang="ts">
import {reactive, ref} from 'vue'
import Category from "@/types/Category.ts";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";


const outerProps = defineProps<{
  category: Category
}>()

const emit = defineEmits<{
  (e: '@confirm', category: Category): void,
}>()


const dialog = ref(false)
const refInputEl = ref<HTMLElement>()

// const dataLocal = ref<Category>({...outerProps.category})
const localFormData = reactive({
  id: outerProps.category.id ? outerProps.category.id : 0,
  imageUrl: outerProps.category.imageUrl ? outerProps.category.imageUrl : "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  name: outerProps.category.name ? outerProps.category.name : "",
  isEnabled: outerProps.category.isEnabled ? outerProps.category.isEnabled : false,
})


// changeAvatar function
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
            @click="dialog = false"
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