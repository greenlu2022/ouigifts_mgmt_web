<script setup lang="ts">
import {reactive, ref} from "vue";
import Category from "@/types/Category.ts";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const localFormData = reactive({
  imageUrl: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  name: "",
  isEnabled: false,
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

const dialog = ref(false)
const refInputEl = ref<HTMLElement>()


const emit = defineEmits<{
  (e: '@confirm', category: Category): void,
}>()


const handleSubmit = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    emit("@confirm", {...localFormData});
    dialog.value = false;

    Object.assign(localFormData, {
      imageUrl: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
      name: "",
      isEnabled: false
    })
    v$.value.$reset();
  } else {
    return
  }
};

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
        Add Banner
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
              label="Name"
              variant="outlined"
              v-model="localFormData.name"
              :error-messages="v$.name.$errors.map((e: any) => e.$message)"
              required
          ></VTextField>
        </VCol>
        <VCol cols="12" sm="6" class="justify-end">
          <VSwitch v-model="localFormData.isEnabled"></VSwitch>
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
:deep(.v-selection-control) {
  padding-right: 8px;
  justify-content: end;
}
</style>