<script setup lang="ts">
import {ref} from "vue";
import DateTimePickField from "@/components/DateTimePickField.vue";
import Banner from "@/types/Banner.ts";

const dialog = ref(false)
const refInputEl = ref<HTMLElement>()
const bannerDataLocal = ref<Banner>({
  imageUrl: "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
})

const emit = defineEmits<{
  (e: '@confirm', banner: Banner): void,
}>()

const handleConfirm = () => {
  emit("@confirm", bannerDataLocal.value)
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
        bannerDataLocal.value.imageUrl = fileReader.result
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
        Edit Banner
      </VCardTitle>
      <VRow class="pa-3">
        <VCol cols="12" sm="3" class="px-3">
          <VAvatar
              rounded="lg"
              size="120"
              :image="bannerDataLocal.imageUrl"
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
              accept=".jpeg,.png,.jpg,GIF,.webp"
              hidden
              @input="changeAvatar"
          >
          <VSpacer></VSpacer>
          <div class="text-body-1 mt-3">
            Allowed JPG, GIF, PNG or WEBP . Max size of 800K
          </div>
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField
              label="Name"
              variant="outlined"
              v-model="bannerDataLocal.name"
          ></VTextField>
        </VCol>
        <VCol cols="12" sm="6">
          <v-select
              label="Action Type"
              :items="['None', 'Inner Route', 'Outer Route']"
              variant="outlined"
              v-model="bannerDataLocal.actionType"
          ></v-select>
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField
              placeholder="https://"
              label="Direct Url"
              variant="outlined"
              v-model="bannerDataLocal.directUrl"
          ></VTextField>
        </VCol>
        <!--          <VCol cols="12" sm="6">-->
        <!--            <VueDatePicker v-model="date" position="center"></VueDatePicker>-->
        <!--          </VCol>-->
        <VCol cols="12" sm="6">
          <DateTimePickField label="Start Date" v-model="bannerDataLocal.startTime"></DateTimePickField>
        </VCol>
        <VCol cols="12" sm="6">
          <DateTimePickField label="End Date" v-model="bannerDataLocal.endTime"></DateTimePickField>
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