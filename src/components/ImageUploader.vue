<script setup lang="ts">
import {ref} from "vue";

const model = defineModel<string>()
const refInputEl = ref<HTMLElement>()

const changeAvatar = (file: Event) => {
  const fileReader = new FileReader()
  const {files} = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        model.value = fileReader.result
      }
    }
  }
}

</script>

<template>
  <VRow>
    <VCol cols="12" sm="3" class="px-3">
      <VAvatar
          rounded="lg"
          size="120"
          :image="model"
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
  </VRow>
</template>

<style scoped>

</style>