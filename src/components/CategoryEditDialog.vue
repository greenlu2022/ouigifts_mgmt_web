<script setup lang="ts">
import {ref} from 'vue'
import Category from "@/types/Category.ts";


const outerProps = defineProps<{
  category: Category
}>()

const emit = defineEmits<{
  (e: '@confirm', category: Category): void,
}>()


const dialog = ref(false)
const refInputEl = ref<HTMLElement>()

const dataLocal = ref<Category>({...outerProps.category})

const handleConfirm = () => {
  emit("@confirm", dataLocal.value)
  dialog.value = false
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
              label="Name"
              variant="outlined"
              v-model="dataLocal.name"
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
            @click="handleConfirm"
        >
          Save
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>

</style>